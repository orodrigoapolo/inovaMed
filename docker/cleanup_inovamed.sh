#!/bin/bash

# Script para desinstalação completa do ambiente InovaMed
# Author: Improved by Claude
# Description: Remove containers, imagens, volumes e diretórios do InovaMed

# ============== VARIÁVEIS GLOBAIS ==============
NODE_IMAGE="rodrigoapolo/imagem-node:1.0"
SQL_IMAGE="rodrigoapolo/imagem-sql:1.0"
IBGE_IMAGE="rodrigoapolo/imagem-javaibge:1.0"
SUS_IMAGE="rodrigoapolo/imagem-javasus:1.0"
WORKSPACE_DIR="$HOME/docker-compose"
REPO_DIR="$HOME/inovaMed"
CONTAINERS=("site-inovamed" "bd-inovamed" "app-javaibge" "app-javasus")
IMAGES=("$NODE_IMAGE" "$SQL_IMAGE" "$IBGE_IMAGE" "$SUS_IMAGE")
VOLUME_PREFIX="docker-compose_"

# ============== FUNÇÕES UTILITÁRIAS ==============

# Função para exibir mensagens com formatação
log_message() {
  echo "====== $1 ======"
}

# Função para verificar se o último comando foi executado com sucesso
check_success() {
  if [ $? -ne 0 ]; then
    echo "AVISO: $1 falhou, mas continuando..."
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

# ============== FUNÇÕES DE REMOÇÃO ==============

# Função para parar e remover todos os containers
remove_containers() {
  log_message "Parando containers em execução"

  for container in "${CONTAINERS[@]}"; do
    if sudo docker ps -a --format '{{.Names}}' | grep -q "^$container$"; then
      echo "Parando container $container..."
      sudo docker stop "$container"
      check_success "Parada do container $container"

      echo "Removendo container $container..."
      sudo docker rm "$container"
      check_success "Remoção do container $container"
    else
      echo "Container $container não encontrado, pulando..."
    fi
  done
}

# Função para remover todas as imagens
remove_images() {
  log_message "Removendo imagens"

  for image in "${IMAGES[@]}"; do
    # Extrai o nome da imagem sem a tag
    image_name=$(echo "$image" | cut -d':' -f1)

    if sudo docker images --format '{{.Repository}}:{{.Tag}}' | grep -q "$image"; then
      echo "Removendo imagem $image..."
      sudo docker rmi "$image"
      check_success "Remoção da imagem $image"
    elif sudo docker images --format '{{.Repository}}' | grep -q "$image_name"; then
      echo "Removendo imagem $image_name (todas as tags)..."
      sudo docker rmi $(sudo docker images --format '{{.Repository}}:{{.Tag}}' | grep "$image_name")
      check_success "Remoção da imagem $image_name"
    else
      echo "Imagem $image não encontrada, pulando..."
    fi
  done

  # Opção para remover todas as imagens relacionadas ao projeto
  echo "Verificando se existem outras imagens relacionadas ao projeto..."
  related_images=$(sudo docker images --format '{{.Repository}}:{{.Tag}}' | grep "rodrigoapolo" || echo "")

  if [ -n "$related_images" ]; then
    echo "Foram encontradas outras imagens relacionadas ao projeto:"
    echo "$related_images"
    confirm "Deseja remover todas as imagens relacionadas ao projeto?"

    if [ $? -eq 0 ]; then
      sudo docker rmi $(echo "$related_images")
      check_success "Remoção de imagens adicionais"
    fi
  else
    echo "Não foram encontradas outras imagens relacionadas ao projeto."
  fi
}

# Função para remover volumes
remove_volumes() {
  log_message "Removendo volumes"

  # Listar volumes relacionados ao projeto
  echo "Volumes disponíveis:"
  volumes=$(sudo docker volume ls --format '{{.Name}}' | grep "${VOLUME_PREFIX}" || echo "")

  if [ -n "$volumes" ]; then
    echo "$volumes"
    confirm "Deseja remover todos os volumes listados acima?"

    if [ $? -eq 0 ]; then
      for volume in $volumes; do
        echo "Removendo volume $volume..."
        sudo docker volume rm "$volume"
        check_success "Remoção do volume $volume"
      done
    fi
  else
    echo "Nenhum volume relacionado ao projeto encontrado."
  fi
}

# Função para remover pastas do projeto
remove_directories() {
  log_message "Removendo diretórios do projeto"

  # Remover diretório de trabalho
  if [ -d "$WORKSPACE_DIR" ]; then
    confirm "Deseja remover o diretório $WORKSPACE_DIR?"
    if [ $? -eq 0 ]; then
      echo "Removendo diretório $WORKSPACE_DIR..."
      rm -rf "$WORKSPACE_DIR"
      check_success "Remoção do diretório $WORKSPACE_DIR"
    fi
  else
    echo "Diretório $WORKSPACE_DIR não encontrado."
  fi

  # Remover diretório do repositório
  if [ -d "$REPO_DIR" ]; then
    confirm "Deseja remover o repositório $REPO_DIR?"
    if [ $? -eq 0 ]; then
      echo "Removendo diretório $REPO_DIR..."
      rm -rf "$REPO_DIR"
      check_success "Remoção do diretório $REPO_DIR"
    fi
  else
    echo "Diretório $REPO_DIR não encontrado."
  fi
}

# Função para remover entradas do crontab
remove_crontab_entries() {
  log_message "Removendo entradas do crontab"

  if crontab -l 2>/dev/null | grep -q "docker start app-javaibge app-javasus"; then
    confirm "Deseja remover as entradas do crontab relacionadas ao InovaMed?"
    if [ $? -eq 0 ]; then
      (crontab -l 2>/dev/null | grep -v "docker start app-javaibge app-javasus") | crontab -
      check_success "Remoção das entradas do crontab"
      echo "Entradas do crontab removidas com sucesso."
    fi
  else
    echo "Nenhuma entrada relacionada ao InovaMed encontrada no crontab."
  fi
}

# Função para verificar o status da limpeza
check_cleanup_status() {
  log_message "Verificando status da limpeza"

  echo "Containers restantes relacionados ao projeto:"
  remaining_containers=$(sudo docker ps -a --format '{{.Names}}' | grep -E "$(IFS="|"; echo "${CONTAINERS[*]}")") || echo "Nenhum container encontrado"
  if [ -n "$remaining_containers" ]; then
    echo "$remaining_containers"
  else
    echo "Nenhum container relacionado ao projeto encontrado."
  fi

  echo ""
  echo "Imagens restantes relacionadas ao projeto:"
  remaining_images=$(sudo docker images --format '{{.Repository}}:{{.Tag}}' | grep "rodrigoapolo") || echo "Nenhuma imagem encontrada"
  if [ -n "$remaining_images" ]; then
    echo "$remaining_images"
  else
    echo "Nenhuma imagem relacionada ao projeto encontrada."
  fi

  echo ""
  echo "Volumes restantes relacionados ao projeto:"
  remaining_volumes=$(sudo docker volume ls --format '{{.Name}}' | grep "${VOLUME_PREFIX}") || echo "Nenhum volume encontrado"
  if [ -n "$remaining_volumes" ]; then
    echo "$remaining_volumes"
  else
    echo "Nenhum volume relacionado ao projeto encontrado."
  fi

  echo ""
  echo "Diretórios do projeto:"
  if [ -d "$WORKSPACE_DIR" ]; then
    echo "- $WORKSPACE_DIR (ainda existe)"
  else
    echo "- $WORKSPACE_DIR (removido)"
  fi

  if [ -d "$REPO_DIR" ]; then
    echo "- $REPO_DIR (ainda existe)"
  else
    echo "- $REPO_DIR (removido)"
  fi
}

# ============== FUNÇÕES DE LIMPEZA ADICIONAL ==============

# Função para limpeza avançada do Docker (opcional)
cleanup_docker() {
  log_message "Limpeza avançada do Docker"

  confirm "Deseja realizar uma limpeza avançada do Docker (remover recursos não utilizados)?"
  if [ $? -eq 0 ]; then
    echo "Removendo containers parados..."
    sudo docker container prune -f
    check_success "Remoção de containers parados"

    echo "Removendo redes não utilizadas..."
    sudo docker network prune -f
    check_success "Remoção de redes não utilizadas"

    echo "Removendo imagens pendentes..."
    sudo docker image prune -f
    check_success "Remoção de imagens pendentes"

    echo "Limpeza avançada concluída."
  fi
}

# ============== FUNÇÃO PRINCIPAL ==============

# Função principal que orquestra todas as operações
main() {
  log_message "Iniciando desinstalação do ambiente InovaMed"
  confirm "Esta operação irá remover containers, imagens e volumes do InovaMed. Deseja continuar?"

  # Executando funções de remoção
  remove_containers
  remove_images
  remove_volumes
  remove_crontab_entries
  remove_directories

  # Limpeza avançada opcional
  #cleanup_docker

  # Verificação final
  check_cleanup_status

  log_message "Desinstalação concluída!"
}

# Executa a função principal
main "$@"
