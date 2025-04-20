var contatoModel = require("../models/contatoModel");

function publicar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var msg = req.body.msgServer;

    // Faça as validações dos valores
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (msg == undefined) {
        res.status(400).send("Sua mensagem está undefined!");
    }  else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        contatoModel.publicar(nome, email, msg)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a publicação! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    publicar
}