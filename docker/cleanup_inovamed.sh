#!/bin/bash

# Script para parar e remover containers e imagens do InovaMed
# Definindo variáveis para nomes de imagens Docker
NODE_IMAGE="rodrigoapolo/imagem-node:1.0"
SQL_IMAGE="rodrigoapolo/imagem-sql:1.0"

echo "====== Parando containers em execução ======"
# Parar o container site-inovamed se estiver em execução
if sudo docker ps -a | grep -q "site-inovamed"; then
    echo "Parando container site-inovamed..."
    sudo docker stop site-inovamed
fi

# Parar o container bd-inovamed se estiver em execução
if sudo docker ps -a | grep -q "bd-inovamed"; then
    echo "Parando container bd-inovamed..."
    sudo docker stop bd-inovamed
fi

echo "====== Removendo containers ======"
# Remover o container site-inovamed se existir
if sudo docker ps -a | grep -q "site-inovamed"; then
    echo "Removendo container site-inovamed..."
    sudo docker rm site-inovamed
fi

# Remover o container bd-inovamed se existir
if sudo docker ps -a | grep -q "bd-inovamed"; then
    echo "Removendo container bd-inovamed..."
    sudo docker rm bd-inovamed
fi

echo "====== Removendo imagens ======"
# Remover a imagem Node se existir
if sudo docker images | grep -q "$(echo $NODE_IMAGE | cut -d':' -f1)"; then
    echo "Removendo imagem $NODE_IMAGE..."
    sudo docker rmi $NODE_IMAGE
fi

# Remover a imagem SQL se existir
if sudo docker images | grep -q "$(echo $SQL_IMAGE | cut -d':' -f1)"; then
    echo "Removendo imagem $SQL_IMAGE..."
    sudo docker rmi $SQL_IMAGE
fi

echo "====== Removendo volumes ======"
# Listar volumes relacionados ao projeto para verificação
echo "Volumes disponíveis:"
sudo docker volume ls | grep "docker-compose_mysql_data" || echo "Nenhum volume encontrado"

# Remover o volume do MySQL se existir
if sudo docker volume ls | grep -q "docker-compose_mysql_data"; then
    echo "Removendo volume docker-compose_mysql_data..."
    sudo docker volume rm docker-compose_mysql_data
fi

echo "====== Verificando se a limpeza foi concluída ======"
echo "Containers restantes:"
sudo docker ps -a

echo "Imagens restantes relacionadas ao projeto:"
sudo docker images | grep "rodrigoapolo" || echo "Nenhuma imagem encontrada"

echo "Volumes restantes relacionados ao projeto:"
sudo docker volume ls | grep "docker-compose_mysql_data" || echo "Nenhum volume encontrado"

echo "====== Limpeza concluída! ======"