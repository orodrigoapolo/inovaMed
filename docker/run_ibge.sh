#!/bin/bash

# Exportar variáveis de ambiente
export urlBancoDados="jdbc:mysql://localhost:3306/inovamed?useSSL=false&serverTimezone=UTC"
export user="root"
export password="urubu100"
export arquivo="populacao_IBGE-2024.xlsx"
export nomeBucket="inovamed-sprint3"
export caminhoArquivo="excel-ibge/populacao_IBGE-2024.xlsx"
export AWS_ACCESS_KEY_ID=""
export AWS_SECRET_ACCESS_KEY=""
export AWS_SESSION_TOKEN=""

# Navegar para o diretório onde o JAR está localizado (ajuste conforme necessário)
#cd /caminho/para/o/diretorio/do/jar

# Executar o JAR
java -jar ./LeitorArquivoIBGE-1.0-SNAPSHOT-jar-with-dependencies.jar
