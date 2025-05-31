var contatoAvisosModel = require("../models/contatoAvisosModel");

function listarContato(req, res) {
    var idUsuario = req.params.idUsuario;
    contatoAvisosModel.listarContato(idUsuario).then(function (resultado) {
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

function configurarContato(req, res) {
    var email = req.body.emailServer;
    var idUsuario = req.params.idUsuario;
    var original = req.body.originalServer;

    // Faça as validações dos valores
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo parametrosModel.js
        contatoAvisosModel.configurarContato(email, original, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a configuração! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function configurarPrimeiroContato(req, res) {
    var email = req.body.emailServer;
    var idUsuario = req.params.idUsuario;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        contatoAvisosModel.configurarPrimeiroContato(email, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a configuração! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function exibirContato(req, res) {
    var idUsuario = req.params.idUsuario;

    contatoAvisosModel.exibirContato(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao exibir os objetivos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function deletarContato(req, res) {
    var email = req.body.emailServer;
    var idUsuario = req.params.idUsuario;

    // Faça as validações dos valores
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo parametrosModel.js
        contatoAvisosModel.deletarContato(email, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a configuração! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    listarContato,
    configurarContato,
    configurarPrimeiroContato,
    exibirContato,
    deletarContato
}