var express = require("express");
var router = express.Router();

var contatoController = require("../controllers/contatoController");

router.post("/publicar", function (req, res) {
    contatoController.publicar(req, res);
});

module.exports = router;