#!/bin/bash

# Script para configurar ambiente InovaMed em Ubuntu
# Atualiza o sistema e instala dependências

# Definindo variáveis para nomes de imagens Docker
NODE_IMAGE="rodrigoapolo/imagem-node:1.0"
SQL_IMAGE="rodrigoapolo/imagem-sql:1.0"

echo "====== Atualizando o sistema ======"
sudo apt update && sudo apt upgrade -y

echo "====== Instalando Java 21 ======"
sudo apt install openjdk-21-jdk -y

echo "====== Instalando Docker ======"
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker

echo "====== Instalando Docker Compose ======"
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "====== Clonando repositório InovaMed ======"
git clone https://github.com/orodrigoapolo/inovaMed.git

echo "====== Criando estrutura de diretórios ======"
mkdir -p ~/docker-compose
cd ~/docker-compose

echo "====== Criando docker-compose.yml ======"
cat > docker-compose.yml << EOL
services:
  web:
    image: ${NODE_IMAGE}
    container_name: site-inovamed
    ports:
      - "8080:8080"
    working_dir: /app
    volumes:
      - ./WEB-DATA-VIZ:/app
    command: bash -c "npm install && npm start"
  db:
    image: ${SQL_IMAGE}
    container_name: bd-inovamed
    environment:
      MYSQL_ROOT_PASSWORD: urubu100
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - /home/ubuntu/inovaMed/SQL/InovaMedBD.sql:/docker-entrypoint-initdb.d/InovaMedBD.sql
volumes:
  mysql_data:
EOL

echo "====== Configurando imagem SQL ======"
mkdir -p ~/docker-compose/DockerBD
cd ~/docker-compose/DockerBD
cp /home/ubuntu/inovaMed/SQL/InovaMedBD.sql .

cat > Dockerfile << 'EOL'
FROM mysql:5.7
ENV MYSQL_ROOT_PASSWORD=urubu100
EXPOSE 3306
EOL

echo "====== Construindo imagem SQL ======"
sudo docker build -t $SQL_IMAGE .

echo "====== Configurando imagem Node ======"
mkdir -p ~/docker-compose/DockerSite
cd ~/docker-compose/DockerSite
mkdir -p WEB-DATA-VIZ
cp -r /home/ubuntu/inovaMed/WEB-DATA-VIZ/* ./WEB-DATA-VIZ/

echo "====== Configurando arquivo .env ======"
cat > ./WEB-DATA-VIZ/.env << 'EOL'
AMBIENTE_PROCESSO=producao
DB_HOST='localhost'
DB_DATABASE='inovamed'
DB_USER='root'
DB_PASSWORD='urubu100'
DB_PORT='3306'
APP_PORT=8080
APP_HOST=localhost
EOL

echo "====== Atualizando app.js ======"
sed -i '1s/\/\/var ambiente_processo = '\''producao'\'';/var ambiente_processo = '\''producao'\'';/' ./WEB-DATA-VIZ/app.js
sed -i '2s/var ambiente_processo = '\''desenvolvimento'\'';/\/\/var ambiente_processo = '\''desenvolvimento'\'';/' ./WEB-DATA-VIZ/app.js

echo "====== Criando Dockerfile para Node ======"
cat > Dockerfile << 'EOL'
FROM node:latest
WORKDIR /app
COPY ./WEB-DATA-VIZ ./
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]
EOL

echo "====== Construindo imagem Node ======"
sudo docker build -t $NODE_IMAGE .

echo "====== Iniciando os containers ======"
cd ~/docker-compose
sudo docker-compose up -d

echo "====== Login no Docker Hub ======"
sudo docker login

echo "====== Enviando imagens para o Docker Hub ======"
sudo docker push $NODE_IMAGE
sudo docker push $SQL_IMAGE

echo "====== Configuração concluída! ======"
echo "Aplicação disponível em: http://localhost:8080"
echo "Banco de dados disponível em: localhost:3306"
