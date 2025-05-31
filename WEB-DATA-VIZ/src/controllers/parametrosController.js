var parametrosModel = require("../models/parametrosModel");

function configurarParametro(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var max = req.body.maxServer;
    var min = req.body.minServer;
    var idUsuario = req.params.idUsuario;

    // Faça as validações dos valores
    if (max == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (min == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo parametrosModel.js
        parametrosModel.configurarParametro(max, min, idUsuario)
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

function configurarPrimeiroParametro(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var max = req.body.maxServer;
    var min = req.body.minServer;
    var idUsuario = req.params.idUsuario;

    // Faça as validações dos valores
    if (max == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (min == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo parametrosModel.js
        parametrosModel.configurarPrimeiroParametro(max, min, idUsuario)
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

function exibirParametro(req, res) {
    var idUsuario = req.params.idUsuario;
    
    parametrosModel.exibirParametro(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao exibirParametro os objetivos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function exibirAlertas(req, res) {
    var idUsuario = req.params.idUsuario;

    parametrosModel.buscarAlertas(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json({ alertas: resultado });
            } else {
                res.status(200).json({ alertas: [] });
            }
        })
        .catch(function (erro) {
            console.log("Erro ao buscar alertas:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}


function inserirAlerta(req, res) {
    console.log("Recebido no body:", req.body);

    var { fkEstoque, fkUsuario, tipoAlerta, descricao, titulo } = req.body;

    if (!fkEstoque || !fkUsuario || !tipoAlerta || !descricao || !titulo) {
        res.status(400).send("Faltando parâmetros para inserir o alerta.");
        return;
    }

    parametrosModel.inserirAlerta({ fkEstoque, fkUsuario, tipoAlerta, descricao, titulo })
        .then(resultado => {
            res.status(201).json({ mensagem: "Alerta inserido com sucesso", resultado });
        })
        .catch(erro => {
            console.log("Erro ao inserir alerta:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}



module.exports = {
    configurarParametro,
    configurarPrimeiroParametro,
    exibirParametro,
    exibirAlertas,
    inserirAlerta
}