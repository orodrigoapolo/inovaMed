CREATE DATABASE inovamed;

USE inovamed;

CREATE TABLE usuario(
idUsuario int primary key auto_increment,
email varchar(45),
nome varchar (50),
cpf varchar(14),
codUnidade int,
cargo varchar(20),
estado varchar(10),
senha varchar(40),
dataNAsc date
);