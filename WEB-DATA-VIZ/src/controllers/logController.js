var logModel = require("../models/logModel");

function exibir(req, res) {
    logModel.exibir().then(function (resultado) {
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


function buscar(req, res) {
    var tipo = req.params.tipo;
    var titulo = req.params.titulo;
    var descricao = req.params.descricao;
    var data = req.params.data;
    logModel.buscar(tipo, titulo, descricao, data).then(function (resultado) {
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

module.exports = {
    exibir,
    buscar
}