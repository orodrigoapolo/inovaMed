var municipiosModel = require("../models/municipiosModel");

function listar(req, res) {
    var fkEstado = req.params.fkEstado;
    municipiosModel.listar(fkEstado).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os objetivos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function editar(req, res) {
    var idUsuario = req.params.idUsuario;
    var email = req.params.email; 
    var senha = req.params.senha; 
    var nome = req.params.nome;
    var cpf = req.params.cpf;
    var dtNasc = req.params.dtNasc;
    var genero = req.params.genero;

    municipiosModel.editar(idUsuario, email, senha, nome, cpf, dtNasc, genero)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao editar usuário: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar,
    editar
}