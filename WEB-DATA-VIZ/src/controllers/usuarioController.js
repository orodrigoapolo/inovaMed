var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.json({
                            idUsuario: resultadoAutenticar[0].idUsuario,
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email,
                            senha: resultadoAutenticar[0].senha,
                            cargo: resultadoAutenticar[0].cargo,
                            cpf: resultadoAutenticar[0].cpf,
                            dtNasc: resultadoAutenticar[0].dtNasc,
                            genero: resultadoAutenticar[0].genero,
                            dtInativo: resultadoAutenticar[0].dtInativo,
                            fkEstado: resultadoAutenticar[0].fkEstado,
                            fkMunicipio: resultadoAutenticar[0].fkMunicipio
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var email = req.body.emailServer;
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var genero = req.body.generoServer;
    var cargo = req.body.cargoServer;
    var fkEstado = req.body.fkEstadoServer;
    var senha = req.body.senhaServer;
    var dtNasc = req.body.dtNascServer;

    // Faça as validações dos valores
    if (email == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (genero == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEstado == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (dtNasc == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(email, nome, cpf, genero, cargo, senha, dtNasc, fkEstado)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listar(req, res) {

    usuarioModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao listar usuários", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listar(req, res) {
    usuarioModel.listar().then(function (resultado) {
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

function deletarUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    usuarioModel.deletarUsuario(idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscar(req, res) {
    var nome = req.params.nome;
    var email = req.params.email;
    var cpf = req.params.cpf;
    var cargo = req.params.cargo;
    var genero = req.params.genero;
    usuarioModel.buscar(nome, email, cpf, cargo, genero).then(function (resultado) {
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
    var cargo = req.params.cargo;    
    var estado = req.params.fkEstado;
    var dtNasc = req.params.dtNasc;
    var genero = req.params.genero;

    usuarioModel.editar(idUsuario, email, senha, nome, cpf, cargo, estado, dtNasc, genero)
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

function novoUsuario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var email = req.body.emailServer;
    var nome = req.body.nomeServer;
    var cpf = req.body.cpfServer;
    var genero = req.body.generoServer;
    var cargo = req.body.cargoServer;
    var fkEstado = req.body.fkEstadoServer;
    var senha = req.body.senhaServer;
    var dtNasc = req.body.dtNascServer;

    // Faça as validações dos valores
    if (email == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (genero == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEstado == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (dtNasc == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.novoUsuario(email, nome, cpf, genero, cargo, senha, dtNasc, fkEstado)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    autenticar,
    cadastrar,
    listar,
    buscar,
    editar,
    deletarUsuario,
    novoUsuario
}