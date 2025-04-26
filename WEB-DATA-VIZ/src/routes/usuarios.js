var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.put("/deletarUsuario/:idUsuario", function (req, res) {
    usuarioController.deletarUsuario(req, res);
})

router.get("/buscar/:nome/:email/:cpf/:cargo/:genero", function (req, res) {
    usuarioController.buscar(req, res);
});

router.put("/editar/:idUsuario/:email/:senha/:nome/:cpf/:cargo/:fkEstado/:dtNasc/:genero", function (req, res) {
    usuarioController.editar(req, res);
})

router.post("/novoUsuario", function (req, res) {
    usuarioController.novoUsuario(req, res);
})

module.exports = router;