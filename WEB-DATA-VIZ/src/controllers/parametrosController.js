var parametrosModel = require("../models/parametrosModel");

function configurarParametroMedicamento(req, res) {
    var max = req.body.maxServer;
    var min = req.body.minServer;
    var param = req.body.paramServer;
    var idUsuario = req.params.idUsuario;

    // Faça as validações dos valores
    if (max == undefined) {
        res.status(400).send("Seu max está undefined!");
    } else if (min == undefined) {
        res.status(400).send("Seu min está undefined!");
    } else if (param == undefined) {
        res.status(400).send("Seu param está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo parametrosModel.js
        parametrosModel.configurarParametroMedicamento(max, min, param, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a configuração! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function deletarParametroMedicamento(req, res) {
    var param = req.body.paramServer;
    var idUsuario = req.params.idUsuario;

    // Faça as validações dos valores
    if (param == undefined) {
        res.status(400).send("Seu param está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo parametrosModel.js
        parametrosModel.deletarParametroMedicamento(param, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a configuração! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function exibirParametroMedicamento(req, res) {
    var idUsuario = req.params.idUsuario;

    parametrosModel.exibirParametroMedicamento(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao exibirParametro os objetivos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function configurarPrimeiroParametroMedicamento(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var max = req.body.maxServer;
    var min = req.body.minServer;
    var param = req.body.paramServer;
    var idUsuario = req.params.idUsuario;

    // Faça as validações dos valores
    if (max == undefined) {
        res.status(400).send("Seu max está undefined!");
    } else if (min == undefined) {
        res.status(400).send("Seu min está undefined!");
    } else if (param == undefined) {
        res.status(400).send("Seu param está undefined!");
    } {

        // Passe os valores como parâmetro e vá para o arquivo parametrosModel.js
        parametrosModel.configurarPrimeiroParametroMedicamento(max, min, param, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a configuração! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function configurarNovoParametroMedicamento(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var max = req.body.maxServer;
    var min = req.body.minServer;
    var param = req.body.paramServer;
    var idUsuario = req.params.idUsuario;

    // Faça as validações dos valores
    if (max == undefined) {
        res.status(400).send("Seu max está undefined!");
    } else if (min == undefined) {
        res.status(400).send("Seu min está undefined!");
    } else if (param == undefined) {
        res.status(400).send("Seu param está undefined!");
    } {

        // Passe os valores como parâmetro e vá para o arquivo parametrosModel.js
        parametrosModel.configurarNovoParametroMedicamento(max, min, param, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a configuração! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function configurarParametroGrafico(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var porc = req.body.porcServer;
    var param = req.body.paramServer;
    var idUsuario = req.params.idUsuario;

    // Faça as validações dos valores
    if (porc == undefined) {
        res.status(400).send("Seu porc está undefined!");
    } else if (param == undefined) {
        res.status(400).send("Seu param está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo parametrosModel.js
        parametrosModel.configurarParametroGrafico(porc, param, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a configuração! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function configurarPrimeiroParametroGrafico(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var porc = req.body.porcServer;
    var param = req.body.paramServer;
    var idUsuario = req.params.idUsuario;

    // Faça as validações dos valores
    if (porc == undefined) {
        res.status(400).send("Seu porc está undefined!");
    } else if (param == undefined) {
        res.status(400).send("Seu param está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo parametrosModel.js
        parametrosModel.configurarPrimeiroParametroGrafico(porc, param, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a configuração! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function configurarNovoParametroGrafico(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var porc = req.body.porcServer;
    var param = req.body.paramServer;
    var idUsuario = req.params.idUsuario;

    // Faça as validações dos valores
    if (porc == undefined) {
        res.status(400).send("Seu porc está undefined!");
    } else if (param == undefined) {
        res.status(400).send("Seu param está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo parametrosModel.js
        parametrosModel.configurarNovoParametroGrafico(porc, param, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a configuração! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function exibirParametroGrafico(req, res) {
    var idUsuario = req.params.idUsuario;

    parametrosModel.exibirParametroGrafico(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao exibirParametro os objetivos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function deletarParametroGrafico(req, res) {
    var param = req.body.paramServer;
    var idUsuario = req.params.idUsuario;

    // Faça as validações dos valores
    if (param == undefined) {
        res.status(400).send("Seu param está undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo parametrosModel.js
        parametrosModel.deletarParametroGrafico(param, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a configuração! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function exibirAlertasMedicamento(req, res) {
    var idUsuario = req.params.idUsuario;

    parametrosModel.buscarAlertasMedicamento(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json({ alertas: resultado });
            } else {
                res.status(200).json({ alertas: [] });
            }
        })
        .catch(function (erro) {
            console.log("Erro ao buscar alertas:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        });
}


module.exports = {
    configurarParametroMedicamento,
    configurarParametroGrafico,
    configurarPrimeiroParametroMedicamento,
    configurarPrimeiroParametroGrafico,
    exibirParametroMedicamento,
    exibirParametroGrafico,
    deletarParametroMedicamento,
    deletarParametroGrafico,
    configurarNovoParametroMedicamento,
    configurarNovoParametroGrafico,
    exibirAlertasMedicamento
    
}