var express = require("express");
var router = express.Router();

var dashAdminController = require("../controllers/dashAdminController");

//Recebendo os dados do html e direcionando para a função cadastrar de parametrosController.js

router.get("/listarKPITotalUsuarios", function (req, res) {
    dashAdminController.listarKPITotalUsuarios(req, res);
});

router.get("/listarKPIQuantidadeCoordenadores", function (req, res) {
    dashAdminController.listarKPIQuantidadeCoordenadores(req, res);
});

router.get("/listarKPIEstadoComMaisCoordenadores", function (req, res) {
    dashAdminController.listarKPIEstadoComMaisCoordenadores(req, res);
});

router.get("/graficoUsuarioEstado", function (req, res) {
    dashAdminController.graficoUsuarioEstado(req, res);
});

router.get("/graficoFaixaEtaria", function (req, res) {
    dashAdminController.graficoFaixaEtaria(req, res);
});

router.get("/graficoGenero", function (req, res) {
    dashAdminController.graficoGenero(req, res);
});



module.exports = router;