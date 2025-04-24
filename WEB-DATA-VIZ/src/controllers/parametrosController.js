var parametrosModel = require("../models/parametrosModel");

function configurar(req, res) {
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
        parametrosModel.configurar(max, min, idUsuario)
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
    configurar
}