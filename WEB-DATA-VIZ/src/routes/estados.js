var express = require("express");
var router = express.Router();

var estadosController = require("../controllers/estadosController");

router.get("/periodoAtual/:idEstado", function (req, res) {
    estadosController.periodoAtual(req, res);
});

router.get("/historico/:idEstado", function (req, res) {
    estadosController.historico(req, res);
});

router.get("/municipios/:idEstado", function (req, res) {
    estadosController.municipios(req, res);
});

router.get("/populacaoAsma/:idEstado", function (req, res) {
    estadosController.populacaoAsma(req, res);
});

router.get("/populacaoAtendida/:idEstado", function (req, res) {
    estadosController.populacaoAtendida(req, res);
});

router.get('/topMesesEstoque/:idEstado', function (req, res) {
    estadosController.topMesesEstoque(req, res);
});


module.exports = router;