var express = require("express");
var router = express.Router();

var parametrosController = require("../controllers/parametrosController");

//Recebendo os dados do html e direcionando para a função cadastrar de parametrosController.js
router.post("/configurarParametro/:idUsuario", function (req, res) {
    parametrosController.configurarParametro(req, res);
})

router.post("/configurarPrimeiroParametro/:idUsuario", function (req, res) {
    parametrosController.configurarPrimeiroParametro(req, res);
})

router.get("/exibirParametro/:idUsuario", function (req, res) {
    parametrosController.exibirParametro(req, res);
});

router.get("/exibirAlertas/:idUsuario", function (req, res) {
    parametrosController.exibirAlertas(req, res);
});

module.exports = router;