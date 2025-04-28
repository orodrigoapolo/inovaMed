-- -----------------------------------------------------
-- Schema InovaMed
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS inovamed;

CREATE SCHEMA IF NOT EXISTS inovamed DEFAULT CHARACTER SET utf8 ;
USE inovamed;

-- -----------------------------------------------------
-- Table Estado
-- -----------------------------------------------------
DROP TABLE IF EXISTS estado ;

CREATE TABLE IF NOT EXISTS estado (
  idEstado INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NULL,
  UF  VARCHAR(2) NULL,
  cod INT
);

-- -----------------------------------------------------
-- Table Municipio
-- -----------------------------------------------------
DROP TABLE IF EXISTS municipio ;

CREATE TABLE IF NOT EXISTS municipio (
  idMunicipio INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(200) NULL,
  cod INT,
  qtdPopulacao INT NULL,
  fkEstado INT NOT NULL,
  FOREIGN KEY (fkEstado) REFERENCES estado (idEstado)
);


-- -----------------------------------------------------
-- Table Usuario
-- -----------------------------------------------------
DROP TABLE IF EXISTS usuario ;

CREATE TABLE IF NOT EXISTS usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255),
  cpf CHAR(11),
  email VARCHAR(255),
  senha VARCHAR(100),
  cargo VARCHAR(45),
  dtNasc DATE,
  genero VARCHAR(45) NULL,
  dtCriacao DATETIME NOT NULL,
  dtInativo DATETIME NULL,
  fkEstado INT NULL,
  fkMunicipio INT NULL,
  FOREIGN KEY (fkEstado) REFERENCES estado (idEstado),
  FOREIGN KEY (fkMunicipio) REFERENCES municipio (idMunicipio)
);

-- -----------------------------------------------------
-- Table Estoque
-- -----------------------------------------------------
DROP TABLE IF EXISTS estoque ;

CREATE TABLE IF NOT EXISTS estoque (
  idEstoque INT PRIMARY KEY AUTO_INCREMENT,
  nomeFarmaco VARCHAR(255) NOT NULL,
  qtdFarmaco INT NULL,
  dtValidade DATE NULL,
  dtEntrada DATE NULL,
  lote VARCHAR(100) NULL,
  CATMAT VARCHAR(100) NULL,
  fkMunicipio INT NOT NULL,
  FOREIGN KEY (fkMunicipio) REFERENCES municipio (idMunicipio)
);

-- -----------------------------------------------------
-- Table Alerta
-- -----------------------------------------------------
DROP TABLE IF EXISTS alerta ;

CREATE TABLE IF NOT EXISTS alerta (
  idAlerta INT NOT NULL,
  fkEstoque INT NOT NULL,
  fkUsuario INT NOT NULL,
  TipoAlerta VARCHAR(45) NULL,
  Descricao VARCHAR(255) NULL,
  dtAlerta DATETIME NULL,
  titulo VARCHAR(100) NULL,
  constraint pkCompostaAlerta PRIMARY KEY (idAlerta, fkEstoque, fkUsuario),
  FOREIGN KEY (fkEstoque) REFERENCES estoque (idEstoque),
  FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
);

-- -----------------------------------------------------
-- Table Marcador
-- -----------------------------------------------------
DROP TABLE IF EXISTS marcador ;

CREATE TABLE IF NOT EXISTS marcador (
  idMarcador INT PRIMARY KEY AUTO_INCREMENT,
  max DECIMAL(10,2) NULL,
  min DECIMAL(10,2) NULL,
  antesMax INT NULL,
  antesMin INT NULL,
  fkUsuario INT NOT NULL,
  FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
);

-- -----------------------------------------------------
-- Table Contato
-- -----------------------------------------------------
DROP TABLE IF EXISTS contato ;

CREATE TABLE IF NOT EXISTS contato (
  idContato INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) NULL,
  fkUsuario INT NOT NULL,
  FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
);

-- -----------------------------------------------------
-- Table Log
-- -----------------------------------------------------
DROP TABLE IF EXISTS log ;

CREATE TABLE IF NOT EXISTS log (
  idLog INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(100) NULL,
  descricao TEXT NULL,
  dtLog DATETIME NULL,
  tipo VARCHAR(100) NULL
);

-- -----------------------------------------------------
-- Tabela FaleConosco
-- -----------------------------------------------------
DROP TABLE IF EXISTS faleConosco;
CREATE TABLE IF NOT EXISTS faleConosco (
    idFale INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200),
    email VARCHAR(200),
    mensagem VARCHAR(255),
	dt_solicitacao DATETIME DEFAULT NOW(),
    status VARCHAR(45)
);

-- -----------------------------------------------------
-- Tabela Planilha
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS planilha (
    idPlanilha INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200)
);

