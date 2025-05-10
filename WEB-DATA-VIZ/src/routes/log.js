var express = require("express");
var router = express.Router();

var logController = require("../controllers/logController");

router.get("/exibir", function (req, res) {
    logController.exibir(req, res);
});

router.get("/buscar/:tipo/:titulo/:descricao/:data", function (req, res) {
    logController.buscar(req, res);
});

module.exports = router;