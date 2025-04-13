-- -----------------------------------------------------
-- Schema InovaMed
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS inovamed;

CREATE SCHEMA IF NOT EXISTS inovamed DEFAULT CHARACTER SET utf8 ;
USE inovamed;

-- -----------------------------------------------------
-- Table Estado
-- -----------------------------------------------------
DROP TABLE IF EXISTS Estado ;

CREATE TABLE IF NOT EXISTS Estado (
  idEstado INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NULL,
  UF  VARCHAR(2) NULL,
  cod INT
);

-- -----------------------------------------------------
-- Table Municipio
-- -----------------------------------------------------
DROP TABLE IF EXISTS Municipio ;

CREATE TABLE IF NOT EXISTS Municipio (
  idMunicipio INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(200) NULL,
  cod INT,
  qtdPopulacao INT NULL,
  fkEstado INT NOT NULL,
  FOREIGN KEY (fkEstado) REFERENCES Estado (idEstado)
);


-- -----------------------------------------------------
-- Table Usuario
-- -----------------------------------------------------
DROP TABLE IF EXISTS Usuario ;

CREATE TABLE IF NOT EXISTS Usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255),
  CPF CHAR(11),
  email VARCHAR(255),
  senha VARCHAR(100),
  cargo VARCHAR(45),
  dtNasc DATE,
  genero VARCHAR(45) NULL,
  dtCriacao DATETIME NOT NULL,
  dtInativo DATETIME NULL,
  fkEstado INT NULL,
  fkMunicipio INT NULL,
  FOREIGN KEY (fkEstado) REFERENCES Estado (idEstado),
  FOREIGN KEY (fkMunicipio) REFERENCES Municipio (idMunicipio)
);

-- -----------------------------------------------------
-- Table Estoque
-- -----------------------------------------------------
DROP TABLE IF EXISTS Estoque ;

CREATE TABLE IF NOT EXISTS Estoque (
  idEstoque INT PRIMARY KEY AUTO_INCREMENT,
  nomeFarmaco VARCHAR(255) NOT NULL,
  qtdFarmaco INT NULL,
  dtValidade DATE NULL,
  dtEntrada DATE NULL,
  lote VARCHAR(100) NULL,
  CATMAT VARCHAR(100) NULL,
  fkMunicipio INT NOT NULL,
  FOREIGN KEY (fkMunicipio) REFERENCES Municipio (idMunicipio)
);

-- -----------------------------------------------------
-- Table Alerta
-- -----------------------------------------------------
DROP TABLE IF EXISTS Alerta ;

CREATE TABLE IF NOT EXISTS Alerta (
  idAlerta INT NOT NULL,
  fkEstoque INT NOT NULL,
  fkUsuario INT NOT NULL,
  TipoAlerta VARCHAR(45) NULL,
  Descricao VARCHAR(255) NULL,
  dtAlerta DATETIME NULL,
  titulo VARCHAR(100) NULL,
  constraint pkCompostaAlerta PRIMARY KEY (idAlerta, fkEstoque, fkUsuario),
  FOREIGN KEY (fkEstoque) REFERENCES Estoque (idEstoque),
  FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario)
);

-- -----------------------------------------------------
-- Table Marcador
-- -----------------------------------------------------
DROP TABLE IF EXISTS Marcador ;

CREATE TABLE IF NOT EXISTS Marcador (
  idMarcador INT PRIMARY KEY AUTO_INCREMENT,
  max DECIMAL(10,2) NULL,
  min DECIMAL(10,2) NULL,
  antesMax INT NULL,
  antesMin INT NULL,
  fkUsuario INT NOT NULL,
  FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario)
);

-- -----------------------------------------------------
-- Table Contato
-- -----------------------------------------------------
DROP TABLE IF EXISTS Contato ;

CREATE TABLE IF NOT EXISTS Contato (
  idContato INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) NULL,
  fkUsuario INT NOT NULL,
  FOREIGN KEY (fkUsuario) REFERENCES Usuario (idUsuario)
);

-- -----------------------------------------------------
-- Table Log
-- -----------------------------------------------------
DROP TABLE IF EXISTS Log ;

CREATE TABLE IF NOT EXISTS Log (
  idLog INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(100) NULL,
  descricao TEXT NULL,
  dtLog DATETIME NULL,
  tipo VARCHAR(100) NULL
);
