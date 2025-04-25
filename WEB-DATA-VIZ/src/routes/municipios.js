var express = require("express");
var router = express.Router();

var municipiosController = require("../controllers/municipiosController");

router.get("/listar/:fkEstado", function (req, res) {
    municipiosController.listar(req, res);
});

router.put("/editar/:idUsuario/:email/:senha/:nome/:cpf/:dtNasc/:genero", function (req, res) {
    municipiosController.editar(req, res);
})

module.exports = router;