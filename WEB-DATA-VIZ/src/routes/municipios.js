var express = require("express");
var router = express.Router();

var municipiosController = require("../controllers/municipiosController");

router.get("/listar/:fkEstado", function (req, res) {
    municipiosController.listar(req, res);
});

router.put("/editar/:idUsuario/:email/:senha/:nome/:cpf/:dtNasc/:genero", function (req, res) {
    municipiosController.editar(req, res);
})
router.get("/historico/:idMunicipio", function (req, res) {
    municipiosController.historico(req, res);
});

router.get("/vencimentos/:idMunicipio", function (req, res) {
    municipiosController.vencimentos(req, res);
});
router.get("/periodos/:idMunicipio", function (req, res) {
    municipiosController.periodos(req, res);
});

router.get("/kpiAtendimento/:idMunicipio", function (req, res){
    municipiosController.kpiAtendimento(req, res);
});   

router.get('/qtdPopulacaoAsma/:idMunicipio',  function (req, res){
    municipiosController.qtdPopulacaoAsma(req, res);
    });   
router.get('/topMesesEstoque/:idMunicipio', function (req, res){
     municipiosController.topMesesEstoque(req, res);
});   

module.exports = router;