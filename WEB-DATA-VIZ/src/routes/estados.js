var express = require("express");
var router = express.Router();

var estadosController = require("../controllers/estadosController");

router.get("/historico/:idEstado", function (req, res) {
    estadosController.historico(req, res);
});

router.get("/municipios/:idEstado", function (req, res) {
    estadosController.municipios(req, res);
});
router.get("/periodos/:idEstado", function (req, res) {
    estadosController.periodos(req, res);
});


module.exports = router;