var express = require("express");
var router = express.Router();

var faleConoscoController = require("../controllers/faleConoscoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/publicar", function (req, res) {
    faleConoscoController.publicar(req, res);
})

module.exports = router;