
var estadosModel = require("../models/estadosModel");

function periodoAtual(req, res) {
    var idEstado = req.params.idEstado;
    console.log("Chamando periodo atual com idEstado =", idEstado);

    estadosModel.periodoAtual(idEstado)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado para periodo atual!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os dados de periodo atual: ", erro.sqlMessage);
            res.status(500).json({ erro: "Erro ao buscar dados de periodo atual" });
        });
}

function historico(req, res) {
    var idEstado = req.params.idEstado;

    estadosModel.historico(idEstado)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum histórico encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o histórico: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function municipios(req, res) {
    var idEstado = req.params.idEstado;

    estadosModel.municipios(idEstado)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json({ erro: "Erro ao buscar vencimentos" });
        });
}

function populacaoAsma(req, res) {
    var idEstado = req.params.idEstado;
    console.log("Chamando população com asma com idEstado =", idEstado);

    estadosModel.populacaoAsma(idEstado)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado para população com asma!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os dados de população com asma: ", erro.sqlMessage);
            res.status(500).json({ erro: "Erro ao buscar dados de população com asma" });
        });
}

function populacaoAtendida(req, res) {
    var idEstado = req.params.idEstado;
    console.log("Chamando população atendida com idEstado =", idEstado);

    estadosModel.populacaoAtendida(idEstado)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado para população atendida!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os dados de população atendida: ", erro.sqlMessage);
            res.status(500).json({ erro: "Erro ao buscar dados de população atendida" });
        });
}

function topMesesEstoque(req, res) {
    var idEstado = req.params.idEstado;
    estadosModel.topMesesEstoque(idEstado)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado para meses de estoque.");
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar meses estoque:", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

module.exports = {
    periodoAtual,
    historico,
    municipios,
    populacaoAsma,
    populacaoAtendida,
    topMesesEstoque
}
