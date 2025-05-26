function abrirDashboard() {
    dash_estadual.style.display = "flex"
    dash_perfil.style.display = "none"
    dash_config.style.display = "none"
}

function abrirPerfil() {
    dash_estadual.style.display = "none"
    dash_perfil.style.display = "block"
    dash_config.style.display = "none"
}

function abrirConfiguracoes() {
    dash_estadual.style.display = "none"
    dash_perfil.style.display = "none"
    dash_config.style.display = "flex"
    opcao_config_container.style.display = "block"
    dash_contato_container.style.display = "none"
    dash_parametro_container.style.display = "none"
}

function abrirContatos() {
    opcao_config_container.style.display = "none"
    dash_contato_container.style.display = "flex"
    dash_parametro_container.style.display = "none"
    exibirContato();
}

function abrirParametros() {
    opcao_config_container.style.display = "none"
    dash_contato_container.style.display = "none"
    dash_parametro_container.style.display = "flex"
    exibirParametros();
}

document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.input-field');
    const btnEditar = document.getElementById('btn-editar');
    const btnSalvar = document.getElementById('btn-salvar');
    const btnDescartar = document.getElementById('btn-descartar');

    const modal = document.getElementById('modal-confirm');
    const btnConfirmDelete = document.getElementById('confirm-delete');
    const btnCancelDelete = document.getElementById('cancel-delete');


    window.editarInformacoes = function () {
        inputs.forEach(input => input.disabled = false);
        btnSalvar.style.display = 'inline-block';
        btnDescartar.style.display = 'inline-block';
        btnEditar.style.display = 'none';
    };


    window.descartarEdicao = function () {
        inputs.forEach(input => {
            input.disabled = true;
            if (input.tagName === 'SELECT') {
                input.selectedIndex = input.dataset.originalIndex || 0;
            } else {
                input.value = input.dataset.originalValue || '';
            }
        });
        btnSalvar.style.display = 'none';
        btnDescartar.style.display = 'none';
        btnEditar.style.display = 'inline-block';
    };


    window.salvarInformacoes = function () {
        inputs.forEach(input => {
            input.disabled = true;
            if (input.tagName === 'SELECT') {
                input.dataset.originalIndex = input.selectedIndex;
            } else {
                input.dataset.originalValue = input.value;
            }
        });
        btnSalvar.style.display = 'none';
        btnDescartar.style.display = 'none';
        btnEditar.style.display = 'inline-block';
        editar();
    };


    window.excluirConta = function () {
        modal.classList.remove('hidden');
    };

    btnCancelDelete.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    btnConfirmDelete.addEventListener('click', () => {
        modal.classList.add('hidden');
        alert("Conta excluída com sucesso!");
        deletarUsuario();
    });


    inputs.forEach(input => {
        if (input.tagName === 'SELECT') {
            input.dataset.originalIndex = input.selectedIndex;
        } else {
            input.dataset.originalValue = input.value;
        }
    });


    // Funções para os parâmetros

    const inputParametroMenorValor = document.getElementById('input_parametro_menor_valor');
    const inputParametroMaiorValor = document.getElementById('input_parametro_maior_valor');
    const btnEditarParametro = document.getElementById('btn-editar-parametro');
    const btnSalvarParametro = document.getElementById('btn-salvar-parametro');
    const btnDescartarParametro = document.getElementById('btn-descartar-parametro');


    window.editarInformacoesParametro = function () {
        inputParametroMenorValor.disabled = false;
        inputParametroMaiorValor.disabled = false;

        btnSalvarParametro.style.display = 'inline-block';
        btnDescartarParametro.style.display = 'inline-block';
        btnEditarParametro.style.display = 'none';
    };


    window.descartarEdicaoParametro = function () {
        inputParametroMenorValor.disabled = true;
        inputParametroMaiorValor.disabled = true;

        btnSalvarParametro.style.display = 'none';
        btnDescartarParametro.style.display = 'none';
        btnEditarParametro.style.display = 'inline-block';


        inputParametroMenorValor.value = inputParametroMenorValor.dataset.originalValue;
        inputParametroMaiorValor.value = inputParametroMaiorValor.dataset.originalValue;

        alert("Parâmetros descartados com sucesso!");
    };


    window.salvarInformacoesParametro = function () {
        inputParametroMenorValor.disabled = true;
        inputParametroMaiorValor.disabled = true;

        inputParametroMenorValor.dataset.originalValue = inputParametroMenorValor.value;
        inputParametroMaiorValor.dataset.originalValue = inputParametroMaiorValor.value;

        btnSalvarParametro.style.display = 'none';
        btnDescartarParametro.style.display = 'none';
        btnEditarParametro.style.display = 'inline-block';

        configurarParametros();
    };

    // Funções para contato

    const inputEmailContato = document.getElementById('input_email_contato');
    const btnEditarContato = document.getElementById('btn-editar-contato');
    const btnSalvarContato = document.getElementById('btn-salvar-contato');
    const btnDescartarContato = document.getElementById('btn-descartar-contato');


    window.editarInformacoesContato = function () {
        inputEmailContato.disabled = false;

        btnSalvarContato.style.display = 'inline-block';
        btnDescartarContato.style.display = 'inline-block';
        btnEditarContato.style.display = 'none';
    };


    window.descartarEdicaoContato = function () {
        inputEmailContato.disabled = true;

        btnSalvarContato.style.display = 'none';
        btnDescartarContato.style.display = 'none';
        btnEditarContato.style.display = 'inline-block';


        inputEmailContato.value = inputEmailContato.dataset.originalValue || '';
        alert("Contato descartado com sucesso!");
    };


    window.salvarInformacoesContato = function () {
        inputEmailContato.disabled = true;

        inputEmailContato.dataset.originalValue = inputEmailContato.value;

        btnSalvarContato.style.display = 'none';
        btnDescartarContato.style.display = 'none';
        btnEditarContato.style.display = 'inline-block';

        configurarContato();
    };

});

function deletarUsuario(idUsuario) {
    var idUsuario = sessionStorage.ID_USUARIO;
    console.log("Criar função de apagar post escolhido - ID" + idUsuario);
    fetch(`/usuarios/deletarUsuario/${idUsuario}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        if (resposta.ok) {
            sessionStorage.clear();
            window.location = "../login.html";
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar deletar usuário! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function editar(idUsuario, email, nome, cpf, cargo, estado, dtNasc, genero) {
    var idUsuario = sessionStorage.ID_USUARIO;
    var email = document.getElementById(`email`).value
    var senha = document.getElementById(`senha`).value
    var nome = document.getElementById(`nome`).value
    var cpf = document.getElementById(`cpf`).value
    var cargo = document.getElementById(`cargo`).value
    var estado = document.getElementById(`estado`).value
    var dtNasc = document.getElementById(`nascimento`).value
    var genero = document.getElementById(`genero`).value;


    fetch(`/usuarios/editar/${idUsuario}/${email}/${senha}/${nome}/${cpf}/${cargo}/${estado}/${dtNasc}/${genero}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        if (resposta.ok) {
            sessionStorage.EMAIL_USUARIO = email;
            sessionStorage.NOME_USUARIO = nome;
            sessionStorage.CPF_USUARIO = cpf;
            sessionStorage.CARGO_USUARIO = cargo;
            sessionStorage.GENERO_USUARIO = genero;
            sessionStorage.SENHA_USUARIO = senha;
            sessionStorage.FK_ESTADO = estado;
            sessionStorage.DT_NASC = dtNasc;

            window.alert(`Usuário editado com sucesso!`);
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar editar usuário! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

// parametro functions

function configurarParametros() {
    // Se houver erros, exibe um alerta
    var maxVar = document.getElementById('input_parametro_maior_valor').value;
    var minVar = document.getElementById('input_parametro_menor_valor').value;
    var idUsuario = sessionStorage.ID_USUARIO;
    if (!maxVar || !minVar) {
        alert('Erro ao configurar: \n' + mensagensErro.join('\n'));
    } else {
        fetch(`/parametros/configurarParametro/${idUsuario}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
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

function exibirParametros(idUsuario) {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/parametros/exibirParametro/${idUsuario}`)
        .then(res => {
            if (res.status === 204) {
                // Nenhum conteúdo (No Content)
                return null;
            }
            if (!res.ok) {
                throw new Error("Erro na resposta do servidor");
            }
            return res.text(); // pega o corpo como texto
        })
        .then(text => {
            if (!text) {
                console.log("Nenhum parâmetro encontrado");
                return;
            }

            const param = JSON.parse(text);
            console.log("Parâmetros existentes:", param);

            input_parametro_menor_valor.value = `${param[0].min}`
            input_parametro_maior_valor.value = `${param[0].max}`

            input_parametro_menor_valor.dataset.originalValue = param[0].min;
            input_parametro_maior_valor.dataset.originalValue = param[0].max;
        })
        .catch(erro => {
            console.error("Erro ao verificar parâmetros:", erro);
        });
}

// contatos functions

// function listarContato() {
//     var idUsuario = sessionStorage.ID_USUARIO;
//     fetch(`/contatoAvisos/listar/${idUsuario}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         },
//     }).then(function (resposta) {
//         console.log("ESTOU NO THEN DO listar()!");

//         if (resposta.ok) {
//             console.log(resposta);
//             resposta.json().then(json => {
//                 console.log(json); // Verifique o conteúdo retornado
//                 if (json.length > 0) {
//                     console.log("Número de usuários:", json.length);

//                     input_email_contato.value = json[0].email;
//                 } else {
//                     console.log("Nenhum usuário encontrado.");
//                 }
//             });

//         } else {
//             console.log("Houve um erro ao tentar realizar a listagem do ContatoAvisos!");
//             resposta.text().then(texto => {
//                 console.error(texto);
//             });
//         }

//     }).catch(function (erro) {
//         console.log(erro);
//     });
// }

function configurarContato() {
    // Se houver erros, exibe um alerta
    var emailVar = document.getElementById('input_email_contato').value;
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/contatoAvisos/configurarContato/${idUsuario}`, {
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

function exibirContato(idUsuario) {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/contatoAvisos/exibirContato/${idUsuario}`)
        .then(res => {
            if (res.status === 204) {
                // Nenhum conteúdo (No Content)
                return null;
            }
            if (!res.ok) {
                throw new Error("Erro na resposta do servidor");
            }
            return res.text(); // pega o corpo como texto
        })
        .then(text => {
            if (!text) {
                console.log("Nenhum contato encontrado");
                return;
            }

            const param = JSON.parse(text);
            console.log("Contatos existentes:", param);

            input_email_contato.value = `${param[0].email}`

            input_email_contato.dataset.originalValue = param[0].email;
        })
        .catch(erro => {
            console.error("Erro ao verificar contato:", erro);
        });
}