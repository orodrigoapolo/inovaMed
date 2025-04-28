var express = require("express");
var router = express.Router();

var logController = require("../controllers/logController");

router.get("/exibir", function (req, res) {
    logController.exibir(req, res);
});

module.exports = router;