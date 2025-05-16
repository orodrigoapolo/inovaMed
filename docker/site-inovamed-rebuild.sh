#!/bin/bash

# Nome do container e da imagem
CONTAINER_NAME="site-inovamed"
IMAGE_NAME="imagem-node"

echo "=============================="
echo "Parando o container $CONTAINER_NAME..."
docker stop $CONTAINER_NAME || echo "Container $CONTAINER_NAME já parado ou não existe."

echo "=============================="
echo "Removendo o container $CONTAINER_NAME..."
docker rm $CONTAINER_NAME || echo "Container $CONTAINER_NAME já removido ou não existe."

echo "=============================="
echo "Removendo a imagem $IMAGE_NAME..."
docker rmi $IMAGE_NAME || echo "Imagem $IMAGE_NAME não encontrada."

echo "=============================="
echo "Construindo a imagem $IMAGE_NAME..."
docker build -t $IMAGE_NAME .

echo "=============================="
echo "Criando e iniciando o container $CONTAINER_NAME na porta 8080..."
docker run -d \
  --name $CONTAINER_NAME \
  -p 8080:8080 \
  $IMAGE_NAME

echo "=============================="
echo "Processo concluído com sucesso!"

