#!/bin/bash

# Configurações do Banco de Dados
export urlBancoDados="jdbc:mysql://localhost:3306/inovamed?useSSL=false&serverTimezone=UTC"
export user="root"
export password="urubu100"

# Configurações AWS S3
export nomeBucket="inovamed-sprint3"
export AWS_ACCESS_KEY_ID=""
export AWS_SECRET_ACCESS_KEY=""
export AWS_SESSION_TOKEN=""

# Navegar até o diretório do JAR (ajuste o caminho)
#cd /caminho/para/o/diretorio/do/jar

# Executar o JAR
java -jar ./limpeza-dados-sus-1.0-SNAPSHOT-jar-with-dependencies.jar
