var express = require("express");
var router = express.Router();

var contatoAvisosController = require("../controllers/contatoAvisosController");

//Recebendo os dados do html e direcionando para a função cadastrar de contatoAvisos.js

router.get("/listar/:idUsuario", function (req, res) {
    contatoAvisosController.listar(req, res);
});

module.exports = router;