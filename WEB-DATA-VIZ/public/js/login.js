function entrar() {
    var emailVar = loginn.value;
    var senhaVar = password.value;

    if (emailVar == "" || senhaVar == "") {
        alert('Preencha os campos corretamente!')
        return false;
    }

    console.log('FORM LOGIN: ', emailVar)
    console.log('FORM SENHA: ', senhaVar)

    fetch("usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta)

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.SENHA_USUARIO = json.senha;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.CPF_USUARIO = json.cpf;
                sessionStorage.CARGO_USUARIO = json.cargo;
                sessionStorage.DT_NASC = json.dtNasc;
                sessionStorage.GENERO_USUARIO = json.genero;
                sessionStorage.DT_INATIVO = json.dtInativo;
                sessionStorage.FK_ESTADO = json.fkEstado;
                sessionStorage.FK_MUNICIPIO = json.fkMunicipio;

                if (json.dtInativo == null) {
                    alert('Logado com sucesso');
                    if (json.cargo == 'administrador') {
                        window.location = "Admin.html";
                    } else if (json.cargo == 'coordenador_estadual') {
                        const idUsuario = sessionStorage.getItem('ID_USUARIO');

                        const fetchParametrosMedicamento = fetch(`/parametros/exibirParametroMedicamento/${idUsuario}`)
                            .then(res => {
                                if (res.status === 204) return null;
                                if (!res.ok) throw new Error("Erro na resposta do servidor");
                                return res.text();
                            })
                            .then(text => {
                                if (!text) {
                                    console.log("Nenhum parâmetro encontrado, configurando...");
                                    configurarPrimeiroParametroMedicamento();
                                    return;
                                }

                                const param = JSON.parse(text);
                                console.log("Parâmetros existentes:", param);

                                sessionStorage.setItem('PARAMETRO_MIN', param.min);
                                sessionStorage.setItem('PARAMETRO_MAX', param.max);
                            })
                            .catch(erro => {
                                console.error("Erro ao verificar parâmetros:", erro);
                                configurarPrimeiroParametroMedicamento();
                            });

                        const fetchParametrosGrafico = fetch(`/parametros/exibirParametroGrafico/${idUsuario}`)
                            .then(res => {
                                if (res.status === 204) return null;
                                if (!res.ok) throw new Error("Erro na resposta do servidor");
                                return res.text();
                            })
                            .then(text => {
                                if (!text) {
                                    console.log("Nenhum parâmetro encontrado, configurando...");
                                    configurarPrimeiroParametroGrafico();
                                    return;
                                }

                                const param = JSON.parse(text);
                                console.log("Parâmetros existentes:", param);

                                sessionStorage.setItem('PARAMETRO_PORC', param[0].min);
                            })
                            .catch(erro => {
                                console.error("Erro ao verificar parâmetros:", erro);
                                configurarPrimeiroParametroGrafico();
                            });

                        const fetchContatos = fetch(`/contatoAvisos/exibirContato/${idUsuario}`)
                            .then(res => {
                                if (res.status === 204) return null;
                                if (!res.ok) throw new Error("Erro na resposta do servidor");
                                return res.text();
                            })
                            .then(text => {
                                if (!text) {
                                    console.log("Nenhum contato encontrado, configurando...");
                                    configurarPrimeiroContato();
                                    return;
                                }

                                const contato = JSON.parse(text);
                                console.log("Contatos existentes:", contato);

                                sessionStorage.setItem('CONTATO_EMAIL', contato.email);
                            })
                            .catch(erro => {
                                console.error("Erro ao verificar contatos:", erro);
                                configurarPrimeiroContato();
                            });

                        // Espera ambos os fetches antes de redirecionar
                        Promise.all([fetchParametrosMedicamento, fetchParametrosGrafico, fetchContatos]).then(() => {
                            window.location = "estadual.html";
                        });


                    } else if (json.cargo == 'coordenador_municipal') {

                        const idUsuario = sessionStorage.getItem('ID_USUARIO');

                        const fetchParametrosMedicamento = fetch(`/parametros/exibirParametroMedicamento/${idUsuario}`)
                            .then(res => {
                                if (res.status === 204) return null;
                                if (!res.ok) throw new Error("Erro na resposta do servidor");
                                return res.text();
                            })
                            .then(text => {
                                if (!text) {
                                    console.log("Nenhum parâmetro encontrado, configurando...");
                                    configurarPrimeiroParametroMedicamento();
                                    return;
                                }

                                const param = JSON.parse(text);
                                console.log("Parâmetros existentes:", param);

                                sessionStorage.setItem('PARAMETRO_MIN', param[0].min);
                                sessionStorage.setItem('PARAMETRO_MAX', param[0].max);
                            })
                            .catch(erro => {
                                console.error("Erro ao verificar parâmetros:", erro);
                                configurarPrimeiroParametroMedicamento();
                            });

                        const fetchParametrosGrafico = fetch(`/parametros/exibirParametroGrafico/${idUsuario}`)
                            .then(res => {
                                if (res.status === 204) return null;
                                if (!res.ok) throw new Error("Erro na resposta do servidor");
                                return res.text();
                            })
                            .then(text => {
                                if (!text) {
                                    console.log("Nenhum parâmetro encontrado, configurando...");
                                    configurarPrimeiroParametroGrafico();
                                    return;
                                }

                                const param = JSON.parse(text);
                                console.log("Parâmetros existentes:", param);

                                sessionStorage.setItem('PARAMETRO_PORC', param[0].min);
                            })
                            .catch(erro => {
                                console.error("Erro ao verificar parâmetros:", erro);
                                configurarPrimeiroParametroGrafico();
                            });

                        const fetchContatos = fetch(`/contatoAvisos/exibirContato/${idUsuario}`)
                            .then(res => {
                                if (res.status === 204) return null;
                                if (!res.ok) throw new Error("Erro na resposta do servidor");
                                return res.text();
                            })
                            .then(text => {
                                if (!text) {
                                    console.log("Nenhum contato encontrado, configurando...");
                                    configurarPrimeiroContato();
                                    return;
                                }

                                const contato = JSON.parse(text);
                                console.log("Contatos existentes:", contato);

                                sessionStorage.setItem('CONTATO_EMAIL', contato[0].email);
                            })
                            .catch(erro => {
                                console.error("Erro ao verificar contatos:", erro);
                                configurarPrimeiroContato();
                            });
                        // Espera ambos os fetches antes de redirecionar
                        Promise.all([fetchParametrosMedicamento, fetchParametrosGrafico, fetchContatos]).then(() => {
                            window.location = "municipal.html";
                        });

                    }
                } else {
                    alert('Usuário está inativo, entre em contato com o suporte para restaurá-lo');
                }

            });
        } else {
            alert('Login e/ou senha incorreto(s)')
            console.log('Houve um erro ao tentar realizar o login!');

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function configurarPrimeiroParametroMedicamento() {
    // Se houver erros, exibe um alerta
    var maxVar = 1000000;
    var minVar = 100000;
    var tipoParam = "medicamento"
    var idUsuario = sessionStorage.ID_USUARIO;
    if (!maxVar || !minVar || !tipoParam) {
        alert('Erro ao configurar: \n' + mensagensErro.join('\n'));
    } else {
        sessionStorage.setItem('PARAMETRO_MIN', minVar);
        sessionStorage.setItem('PARAMETRO_MAX', maxVar);

        fetch(`/parametros/configurarPrimeiroParametroMedicamento/${idUsuario}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                paramServer: tipoParam,
                maxServer: maxVar,
                minServer: minVar
            }),
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    setTimeout(() => {
                        alert('Configuração realizada com sucesso!');
                    }, 2000);
                } else {
                    throw "Houve um erro ao tentar realizar a configuração!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    }
}

function configurarPrimeiroParametroGrafico() {
    // Se houver erros, exibe um alerta
    var porcentagem = 50;
    var tipoParam = "grafico"
    var idUsuario = sessionStorage.ID_USUARIO;
    if (!porcentagem || !tipoParam) {
        alert('Erro ao configurar: \n' + mensagensErro.join('\n'));
    } else {
        sessionStorage.setItem('PARAMETRO_PORC', porcentagem);

        fetch(`/parametros/configurarPrimeiroParametroGrafico/${idUsuario}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                paramServer: tipoParam,
                porcServer: porcentagem,
            }),
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    setTimeout(() => {
                        alert('Configuração realizada com sucesso!');
                    }, 2000);
                } else {
                    throw "Houve um erro ao tentar realizar a configuração!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    }
}

function configurarPrimeiroContato() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var emailVar = sessionStorage.EMAIL_USUARIO;

    fetch(`/contatoAvisos/configurarPrimeiroContato/${idUsuario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emailServer: emailVar
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                setTimeout(() => {
                    alert('Configuração realizada com sucesso!');
                }, 2000);
            } else {
                throw "Houve um erro ao tentar realizar a configuração!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}
