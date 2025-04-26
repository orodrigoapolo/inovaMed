var express = require("express");
var router = express.Router();

var parametrosController = require("../controllers/parametrosController");

//Recebendo os dados do html e direcionando para a função cadastrar de parametrosController.js
router.post("/configurar/:idUsuario", function (req, res) {
    parametrosController.configurar(req, res);
})

module.exports = router;