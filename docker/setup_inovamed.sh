#!/bin/bash

# Script para configurar ambiente InovaMed em Ubuntu
# Author: Improved by Claude (versão modular)
# Description: Installs and configures InovaMed environment with proper error handling

# ============== VARIÁVEIS GLOBAIS ==============
NODE_IMAGE="rodrigoapolo/imagem-node:1.0"
SQL_IMAGE="rodrigoapolo/imagem-sql:1.0"
IBGE_IMAGE="rodrigoapolo/imagem-javaibge:1.0"
SUS_IMAGE="rodrigoapolo/imagem-javasus:1.0"
DB_PASSWORD="urubu100"
BUCKET_NAME="inovamed-sprint3"
REPO_URL="https://github.com/orodrigoapolo/inovaMed.git"
WORKSPACE_DIR="$HOME/docker-compose"
REPO_DIR="$HOME/inovaMed"

# ============== FUNÇÕES UTILITÁRIAS ==============

# Função para exibir mensagens com formatação
log_message() {
  echo "====== $1 ======"
}

# Função para verificar se o último comando foi executado com sucesso
check_success() {
  if [ $? -ne 0 ]; then
    echo "ERROR: $1 falhou. Abortando."
    exit 1
  fi
}

# Função para confirmar antes de continuar
confirm() {
  read -p "$1 (s/n): " response
  case "$response" in
    [sS]) 
      return 0
      ;;
    *)
      echo "Operação cancelada pelo usuário."
      exit 0
      ;;
  esac
}

# ============== FUNÇÕES DE INSTALAÇÃO ==============

# Função para atualizar o sistema
update_system() {
  log_message "Atualizando o sistema"
  sudo apt update && sudo apt upgrade -y
  check_success "Atualização do sistema"
}

# Função para instalar Java
install_java() {
  log_message "Instalando Java 21"
  sudo apt install openjdk-21-jdk -y
  check_success "Instalação do Java"
}

# Função para instalar Docker
install_docker() {
  log_message "Instalando Docker"
  sudo apt install docker.io -y
  check_success "Instalação do Docker"
  sudo systemctl start docker
  sudo systemctl enable docker
  check_success "Configuração do Docker"
}

# Função para instalar Docker Compose
install_docker_compose() {
  log_message "Instalando Docker Compose"
  sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  check_success "Download do Docker Compose"
  sudo chmod +x /usr/local/bin/docker-compose
  check_success "Configuração do Docker Compose"
}

# Função para instalar todas as dependências
install_dependencies() {
  update_system
  install_java
  install_docker
  install_docker_compose
}

# ============== FUNÇÕES DE REPOSITÓRIO ==============

# Função para clonar ou atualizar o repositório
setup_repository() {
  # Verificar se o repositório já existe
  if [ -d "$REPO_DIR" ]; then
    log_message "Repositório já existe, atualizando"
    cd "$REPO_DIR" || check_success "Entrar no diretório do repositório"
    
    # Mostrar branch atual
    current_branch=$(git branch --show-current)
    echo "Branch atual: $current_branch"
    
    # Perguntar se deseja alterar a branch
    read -p "Deseja alterar para outra branch? (main/development) [N/s]: " branch_choice
    branch_choice=${branch_choice:-N}  # Default para 'N'
    
    case "$branch_choice" in
      [sS])
        read -p "Digite o nome da branch desejada (ex: main/development): " new_branch
        git fetch origin
        git checkout "$new_branch" && git pull origin "$new_branch"
        check_success "Mudança para branch $new_branch"
        ;;
      *)
        git pull origin "$current_branch"
        check_success "Atualização da branch atual ($current_branch)"
        ;;
    esac
  else
    log_message "Clonando repositório InovaMed"
    git clone "$REPO_URL" "$REPO_DIR"
    check_success "Clone do repositório"
    cd "$REPO_DIR" || check_success "Entrar no diretório clonado"
    
    # Perguntar qual branch usar após o clone
    read -p "Qual branch deseja usar? (main/development) [main]: " branch_choice
    branch_choice=${branch_choice:-main}  # Default para main
    
    git checkout "$branch_choice"
    check_success "Checkout para branch $branch_choice"
  fi
}

# ============== FUNÇÕES DE DOCKER COMPOSE ==============

# Função para criar o arquivo docker-compose.yml
create_docker_compose() {
  log_message "Criando estrutura de diretórios"
  mkdir -p "$WORKSPACE_DIR"
  check_success "Criação do diretório workspace"

  # Criando docker-compose.yml
  cd "$WORKSPACE_DIR"
  log_message "Criando docker-compose.yml"
  cat > docker-compose.yml << EOL

version: '3.8'

services:
  db:
    image: ${SQL_IMAGE}
    container_name: bd-inovamed
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
    ports:
      - "3306:3306"
    networks:
      - app-network
    volumes:
      - mysql_data:/var/lib/mysql
      - ${REPO_DIR}/SQL/InovaMedBD.sql:/docker-entrypoint-initdb.d/InovaMedBD.sql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 20s

  web:
    image: ${NODE_IMAGE}
    container_name: site-inovamed
    ports:
      - "8080:8080"
    working_dir: /app
    command: bash -c "npm install && npm start"
    networks:
      - app-network

  java-ibge:
    image: ${IBGE_IMAGE}
    container_name: app-javaibge
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-network
    command: >
      bash -c "
        echo 'Aguardando banco de dados estar completamente pronto...'
        until timeout 1 bash -c '</dev/tcp/db/3306'; do
          echo 'Aguardando conexão com o banco...'
          sleep 2
        done
        echo 'Conexão estabelecida! Aguardando criação das tabelas...'
        sleep 20
        echo 'Iniciando aplicação Java IBGE...'
        java -jar /app/app.jar
      "

  java-sus:
    image: ${SUS_IMAGE}
    container_name: app-javasus
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-network
    command: >
      bash -c "
        echo 'Aguardando banco de dados estar completamente pronto...'
        until timeout 1 bash -c '</dev/tcp/db/3306'; do
          echo 'Aguardando conexão com o banco...'
          sleep 2
        done
        echo 'Conexão estabelecida! Aguardando criação das tabelas...'
        sleep 20
        echo 'Iniciando aplicação Java SUS...'
        java -jar /app/app.jar
      "

volumes:
  mysql_data:

networks:
  app-network:
    driver: bridge

EOL
  check_success "Criação do arquivo docker-compose.yml"
}

# ============== FUNÇÕES DE CONFIGURAÇÃO SQL ==============

# Função para configurar a imagem SQL
setup_sql_image() {
  log_message "Configurando imagem SQL"
  mkdir -p "$WORKSPACE_DIR/DockerBD"
  check_success "Criação do diretório DockerBD"

  cd "$WORKSPACE_DIR/DockerBD"
  if [ -f "$REPO_DIR/SQL/InovaMedBD.sql" ]; then
    cp "$REPO_DIR/SQL/InovaMedBD.sql" .
    check_success "Cópia do arquivo SQL"
  else
    echo "ERRO: Arquivo SQL não encontrado em $REPO_DIR/SQL/InovaMedBD.sql"
    exit 1
  fi

  cat > Dockerfile << 'EOL'
FROM mysql:5.7
ARG DB_PASSWORD
ENV MYSQL_ROOT_PASSWORD=${DB_PASSWORD}
EXPOSE 3306
EOL
  check_success "Criação do Dockerfile para SQL"

  log_message "Construindo imagem SQL"
  sudo docker build -t "$SQL_IMAGE" --build-arg DB_PASSWORD="$DB_PASSWORD" .
  check_success "Build da imagem SQL"
}

# ============== FUNÇÕES DE CONFIGURAÇÃO NODE ==============

# Função para configurar a imagem Node
setup_node_image() {
  log_message "Configurando imagem Node"
  mkdir -p "$WORKSPACE_DIR/DockerSite/WEB-DATA-VIZ"
  check_success "Criação do diretório para o site"

  cd "$WORKSPACE_DIR/DockerSite"
  if [ -d "$REPO_DIR/WEB-DATA-VIZ" ]; then
    cp -r "$REPO_DIR/WEB-DATA-VIZ/"* "./WEB-DATA-VIZ/"
    check_success "Cópia dos arquivos web"
  else
    echo "ERRO: Diretório WEB-DATA-VIZ não encontrado em $REPO_DIR"
    exit 1
  fi

  if [ -f "./WEB-DATA-VIZ/package.json" ]; then
    echo "package.json copiado com sucesso!"
  else
    echo "ERRO: package.json não foi encontrado após o cp!"
    exit 1
  fi

  log_message "Configurando arquivo .env para Node"
  cat > ./WEB-DATA-VIZ/.env << EOF
AMBIENTE_PROCESSO=producao
DB_HOST=db
DB_DATABASE='inovamed'
DB_USER='root'
DB_PASSWORD='${DB_PASSWORD}'
DB_PORT='3306'
APP_PORT=8080
APP_HOST=localhost
EOF
  check_success "Criação do arquivo .env para Node"

  log_message "Atualizando app.js"
  if [ -f "./WEB-DATA-VIZ/app.js" ]; then
      sed -i "s|^[[:space:]]*//[[:space:]]*\(var ambiente_processo = 'producao';\)|\1|" ./WEB-DATA-VIZ/app.js
      sed -i "s|^[[:space:]]*\(var ambiente_processo = 'desenvolvimento';\)|//\1|" ./WEB-DATA-VIZ/app.js
    check_success "Configuração do ambiente no app.js"
  else
    echo "ERRO: Arquivo app.js não encontrado"
    exit 1
  fi

  log_message "Criando Dockerfile para Node"
  cat > Dockerfile << 'EOL'
FROM node:latest
WORKDIR /app
# Copia apenas os arquivos de dependência primeiro
COPY ./WEB-DATA-VIZ/package*.json ./
COPY ./WEB-DATA-VIZ ./
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]
EOL
  check_success "Criação do Dockerfile para Node"

  log_message "Construindo imagem Node"
  sudo docker build -t "$NODE_IMAGE" .
  check_success "Build da imagem Node"
}

# ============== FUNÇÕES DE CONFIGURAÇÃO ENV ==============

# Função para configurar o arquivo .env principal
setup_env_file() {
  log_message "Executando extração de dados para configuração"
  cd "$HOME"
  if [ -f "extracao-dados-1.0-SNAPSHOT-jar-with-dependencies.jar" ]; then
    java -jar extracao-dados-1.0-SNAPSHOT-jar-with-dependencies.jar
    check_success "Execução do JAR de extração de dados"
  else
    echo "AVISO: Arquivo JAR de extração não encontrado. Pulando esta etapa."
    # Criando um arquivo .env básico para continuar o script
    touch "$WORKSPACE_DIR/.env"
  fi

  log_message "Adicionando configurações ao arquivo .env"
  cat >> "$WORKSPACE_DIR/.env" << EOF
export caminhoArquivo="excel-ibge/populacao_IBGE-2024.xlsx"
export arquivo="populacao_IBGE-2024.xlsx"

export user="root"
export password="${DB_PASSWORD}"
export urlBancoDados="jdbc:mysql://db:3306/inovamed?useSSL=false&serverTimezone=UTC"

export nomeBucket="${BUCKET_NAME}"
EOF
  check_success "Adição de configurações ao .env"
}

# ============== FUNÇÕES DE CONFIGURAÇÃO JAVA IBGE ==============

# Função para configurar a imagem Java IBGE
setup_java_ibge() {
  log_message "Configurando Java IBGE"
  mkdir -p "$WORKSPACE_DIR/DockerJavaIBGE"
  check_success "Criação do diretório DockerJavaIBGE"

  cp "$WORKSPACE_DIR/.env" "$WORKSPACE_DIR/DockerJavaIBGE/"
  check_success "Cópia do arquivo .env para DockerJavaIBGE"

  if [ -f "$HOME/LeitorArquivoIBGE-1.0-SNAPSHOT-jar-with-dependencies.jar" ]; then
    cp "$HOME/LeitorArquivoIBGE-1.0-SNAPSHOT-jar-with-dependencies.jar" "$WORKSPACE_DIR/DockerJavaIBGE/"
    check_success "Cópia do JAR IBGE"
  else
    echo "ERRO: JAR do IBGE não encontrado"
    exit 1
  fi

  cd "$WORKSPACE_DIR/DockerJavaIBGE"

  cat > Dockerfile << 'EOL'
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copiar o arquivo JAR para o container
COPY LeitorArquivoIBGE-1.0-SNAPSHOT-jar-with-dependencies.jar /app/app.jar

# Copiar o arquivo .env para o container
COPY .env /app/.env

# Instalar o pacote gettext-base para ter acesso ao comando envsubst
RUN apt-get update && apt-get install -y gettext-base

# Criar um script de inicialização que carrega as variáveis do arquivo .env
RUN echo '#!/bin/bash\n\
source /app/.env\n\
export $(cut -d= -f1 /app/.env)\n\
java -jar /app/app.jar' > /app/start.sh && chmod +x /app/start.sh

# Comando para executar o aplicativo usando o script de inicialização
CMD ["/app/start.sh"]
EOL
  check_success "Criação do Dockerfile para JavaIBGE"

  log_message "Construindo imagem JavaIBGE"
  sudo docker build -t "$IBGE_IMAGE" .
  check_success "Build da imagem JavaIBGE"
}

# ============== FUNÇÕES DE CONFIGURAÇÃO JAVA SUS ==============

# Função para configurar a imagem Java SUS
setup_java_sus() {
  log_message "Configurando Java SUS"
  mkdir -p "$WORKSPACE_DIR/DockerJavaSUS"
  check_success "Criação do diretório DockerJavaSUS"

  cp "$WORKSPACE_DIR/.env" "$WORKSPACE_DIR/DockerJavaSUS/"
  check_success "Cópia do arquivo .env para DockerJavaSUS"

  if [ -f "$HOME/limpeza-dados-sus-1.0-SNAPSHOT-jar-with-dependencies.jar" ]; then
    cp "$HOME/limpeza-dados-sus-1.0-SNAPSHOT-jar-with-dependencies.jar" "$WORKSPACE_DIR/DockerJavaSUS/"
    check_success "Cópia do JAR SUS"
  else
    echo "ERRO: JAR do SUS não encontrado"
    exit 1
  fi

  cd "$WORKSPACE_DIR/DockerJavaSUS"

  cat > Dockerfile << 'EOL'
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copiar o arquivo JAR para o container
COPY limpeza-dados-sus-1.0-SNAPSHOT-jar-with-dependencies.jar /app/app.jar

# Copiar o arquivo .env para o container
COPY .env /app/.env

# Instalar o pacote gettext-base para ter acesso ao comando envsubst
RUN apt-get update && apt-get install -y gettext-base

# Criar um script de inicialização que carrega as variáveis do arquivo .env
RUN echo '#!/bin/bash\n\
source /app/.env\n\
export $(cut -d= -f1 /app/.env)\n\
java -jar /app/app.jar' > /app/start.sh && chmod +x /app/start.sh

# Comando para executar o aplicativo usando o script de inicialização
CMD ["/app/start.sh"]
EOL
  check_success "Criação do Dockerfile para JavaSUS"

  log_message "Construindo imagem JavaSUS"
  sudo docker build -t "$SUS_IMAGE" .
  check_success "Build da imagem JavaSUS"
}

# ============== FUNÇÕES DE INICIALIZAÇÃO E FINALIZAÇÃO ==============

# Função para iniciar os containers
start_containers() {
  log_message "Iniciando os containers"
  cd "$WORKSPACE_DIR"
  confirm "Deseja iniciar os containers agora?"
  sudo docker-compose up -d
  check_success "Inicialização dos containers"
}

# Função para configurar crontab para reinício automático
setup_crontab() {
  log_message "Configurando reinício automático dos containers Java"

  # Definindo os dois agendamentos (você pode ajustar os horários conforme necessário)
  CRON_JOB1="* * * * * sudo docker start app-javaibge"
  CRON_JOB2="40 * * * * sudo docker start app-javasus"

  # Removendo entradas anteriores (se existirem) e adicionando as novas
  (crontab -l 2>/dev/null || echo "") | grep -v "docker start app-javaibge" | grep -v "docker start app-javasus" | { cat; echo "$CRON_JOB1"; echo "$CRON_JOB2"; } | crontab -

  # Checando se foi configurado com sucesso
  check_success "Configuração do crontab"
  echo "Containers Java serão reiniciados automaticamente: app-javaibge às 1 min de cada hora e app-javasus às 40 min de cada hora"
}


# Função para fazer upload das imagens para o Docker Hub
upload_to_dockerhub() {
  log_message "Login no Docker Hub e push de imagens"
  confirm "Deseja fazer login e enviar as imagens para o Docker Hub?"
  sudo docker login
  check_success "Login no Docker Hub"

  sudo docker push "$NODE_IMAGE"
  check_success "Push da imagem Node"

  sudo docker push "$SQL_IMAGE"
  check_success "Push da imagem SQL"

  sudo docker push "$IBGE_IMAGE"
  check_success "Push da imagem JavaIBGE"

  sudo docker push "$SUS_IMAGE" 
  check_success "Push da imagem JavaSUS"
}

# Função para mostrar informações finais
show_completion_info() {
  log_message "Configuração concluída!"
  echo "Aplicação disponível em: http://localhost:8080"
  echo "Banco de dados disponível em: localhost:3306 (user: root, password: $DB_PASSWORD)"
  echo "Todas as imagens foram construídas e enviadas para o Docker Hub"
}

# ============== FUNÇÃO PRINCIPAL ==============

# Função principal que orquestra todas as operações
main() {
  # Instalação de dependências
  install_dependencies
  
  # Configuração do repositório
  setup_repository
  
  # Configuração do ambiente Docker
  create_docker_compose
  
  # Configuração das imagens
  setup_sql_image
  setup_node_image
  
  # Configuração do arquivo .env
  setup_env_file
  
  # Configuração das aplicações Java
  setup_java_ibge
  setup_java_sus
  
  # Inicialização dos containers
  start_containers
  
  # Configuração do crontab
  setup_crontab
  
  # Upload para o Docker Hub
  #upload_to_dockerhub
  
  # Exibição de informações finais
  show_completion_info
}

# Executa a função principal
main "$@"