var express = require("express");
var router = express.Router();

var contatoAvisosController = require("../controllers/contatoAvisosController");

//Recebendo os dados do html e direcionando para a função cadastrar de contatoAvisos.js

router.get("/listarContato/:idUsuario", function (req, res) {
    contatoAvisosController.listarContato(req, res);
});

router.post("/configurarContato/:idUsuario", function (req, res) {
    contatoAvisosController.configurarContato(req, res);
});

router.post("/configurarPrimeiroContato/:idUsuario", function (req, res) {
    contatoAvisosController.configurarPrimeiroContato(req, res);
});

router.get("/exibirContato/:idUsuario", function (req, res) {
    contatoAvisosController.exibirContato(req, res);
});

router.post("/deletarContato/:idUsuario", function (req, res) {
    contatoAvisosController.deletarContato(req, res);
});

module.exports = router;