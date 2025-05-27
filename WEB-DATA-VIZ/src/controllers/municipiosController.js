var municipiosModel = require("../models/municipiosModel");

function listar(req, res) {
    var fkEstado = req.params.fkEstado;
    municipiosModel.listar(fkEstado).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os objetivos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function editar(req, res) {
    var idUsuario = req.params.idUsuario;
    var email = req.params.email; 
    var senha = req.params.senha; 
    var nome = req.params.nome;
    var cpf = req.params.cpf;
    var dtNasc = req.params.dtNasc;
    var genero = req.params.genero;

    municipiosModel.editar(idUsuario, email, senha, nome, cpf, dtNasc, genero)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao editar usuário: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function historico(req, res) {
    var idMunicipio = req.params.idMunicipio;

    municipiosModel.historico(idMunicipio)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum histórico encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o histórico: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function vencimentos(req, res) {
    var idMunicipio = req.params.idMunicipio;
    console.log("ID município recebido para consulta:", idMunicipio);

    municipiosModel.vencimentos(idMunicipio)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json({ erro: "Erro ao buscar vencimentos" });
        });
}
function periodos(req, res) {
    var idMunicipio = req.params.idMunicipio;
    console.log("Chamando periodos com idMunicipio =", idMunicipio);

    municipiosModel.periodos(idMunicipio)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado para os períodos!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os dados dos períodos: ", erro.sqlMessage);
            res.status(500).json({ erro: "Erro ao buscar dados dos períodos" });
        });
}

function kpiAtendimento(req, res) {
    const idMunicipio = req.params.idMunicipio;

    municipiosModel.kpiAtendimento(idMunicipio)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]); // retorna o primeiro e único resultado da KPI
            } else {
                res.status(204).send("Nenhum dado encontrado para a KPI de atendimento.");
            }
        })
        .catch(erro => {
            console.log("Erro ao buscar KPI de atendimento:", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function qtdPopulacaoAsma(req, res) {
    const idMunicipio = req.params.idMunicipio;

    municipiosModel.qtdPopulacaoAsma(idMunicipio)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send("Nenhum município encontrado.");
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar município:", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function topMesesEstoque(req, res) {
    const idMunicipio = req.params.idMunicipio;
    municipiosModel.topMesesEstoque(idMunicipio)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado para meses de estoque.");
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar meses estoque:", erro.sqlMessage);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

function tendencia(req,res)
{
    const idMunicipio = req.params.idMunicipio;
    municipiosModel.tendencia(idMunicipio)
    .then (resultado => {
        if (resultado.length > 0){
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum dado encontrado para a próxima tendência de remédios.")
        }
    })
    .catch(erro =>{
        console.error("Erro ao buscar remédios para tendÊncia:", erro.sqlMessage);
        res.status(500).json({erro : erro.sqlMessage});
    });
}



module.exports = {
    listar,
    editar,
    historico,
    vencimentos,
    periodos,
    kpiAtendimento,
      topMesesEstoque,
    qtdPopulacaoAsma,
    tendencia
}