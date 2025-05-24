
var estadosModel = require("../models/estadosModel");

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

function periodos(req, res) {
    var idEstado = req.params.idEstado;
    console.log("Chamando periodos com idEstado =", idEstado);

    estadosModel.periodos(idEstado)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado para os períodos!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os dados dos períodos: ", erro.sqlMessage);
            res.status(500).json({ erro: "Erro ao buscar dados dos períodos" });
        });
}


module.exports = {
    historico,
    municipios,
    periodos
}
