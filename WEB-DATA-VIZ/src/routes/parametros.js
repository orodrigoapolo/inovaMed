var express = require("express");
var router = express.Router();

var parametrosController = require("../controllers/parametrosController");

// medicamento
router.post("/configurarParametroMedicamento/:idUsuario", function (req, res) {
    parametrosController.configurarParametroMedicamento(req, res);
})

router.post("/deletarParametroMedicamento/:idUsuario", function (req, res) {
    parametrosController.deletarParametroMedicamento(req, res);
})

router.post("/configurarPrimeiroParametroMedicamento/:idUsuario", function (req, res) {
    parametrosController.configurarPrimeiroParametroMedicamento(req, res);
})

router.get("/exibirParametroMedicamento/:idUsuario", function (req, res) {
    parametrosController.exibirParametroMedicamento(req, res);
});

router.post("/configurarNovoParametroMedicamento/:idUsuario", function (req, res) {
    parametrosController.configurarNovoParametroMedicamento(req, res);
});



// grafico
router.post("/configurarParametroGrafico/:idUsuario", function (req, res) {
    parametrosController.configurarParametroGrafico(req, res);
})

router.post("/configurarPrimeiroParametroGrafico/:idUsuario", function (req, res) {
    parametrosController.configurarPrimeiroParametroGrafico(req, res);
})

router.post("/deletarParametroGrafico/:idUsuario", function (req, res) {
    parametrosController.deletarParametroGrafico(req, res);
})

router.get("/exibirParametroGrafico/:idUsuario", function (req, res) {
    parametrosController.exibirParametroGrafico(req, res);
});

router.post("/configurarNovoParametroGrafico/:idUsuario", function (req, res) {
    parametrosController.configurarNovoParametroGrafico(req, res);
});


module.exports = router;