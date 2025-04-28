function abrirDashboard() {
    dash_municipal.style.display = "flex"
    dash_perfil.style.display = "none"
    dash_config.style.display = "none"
}

function abrirPerfil() {
    dash_municipal.style.display = "none"
    dash_perfil.style.display = "block"
    dash_config.style.display = "none"
}

function abrirConfiguracoes() {
    dash_municipal.style.display = "none"
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
    listar();
}

function abrirParametros() {
    opcao_config_container.style.display = "none"
    dash_contato_container.style.display = "none"
    dash_parametro_container.style.display = "flex"
    exibir();
}

document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.input-field');
    const btnEditar = document.getElementById('btn-editar');
    const btnSalvar = document.getElementById('btn-salvar');
    const btnDescartar = document.getElementById('btn-descartar');

    const modal = document.getElementById('modal-confirm');
    const btnConfirmDelete = document.getElementById('confirm-delete');
    const btnCancelDelete = document.getElementById('cancel-delete');

    // Habilitar edição
    window.editarInformacoes = function () {
        inputs.forEach(input => input.disabled = false);
        btnSalvar.style.display = 'inline-block';
        btnDescartar.style.display = 'inline-block';
        btnEditar.style.display = 'none';
    };

    // Descartar mudanças
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

    // Salvar mudanças
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

    // Exclusão de conta
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
        // Aqui você pode redirecionar ou fazer uma chamada para deletar a conta
    });

    // Armazenar valores iniciais
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


        inputParametroMenorValor.value = inputParametroMenorValor.dataset.originalValue || '';
        inputParametroMaiorValor.value = inputParametroMaiorValor.dataset.originalValue || '';
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
        configurar();
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

    };

});

function listar() {
    var idUsuario = sessionStorage.ID_USUARIO;
    fetch(`/contatoAvisos/listar/${idUsuario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO listar()!");

        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json); // Verifique o conteúdo retornado
                if (json.length > 0) {
                    console.log("Número de usuários:", json.length);

                    input_email_contato.value = json[0].email;
                } else {
                    console.log("Nenhum usuário encontrado.");
                }
            });

        } else {
            console.log("Houve um erro ao tentar realizar a listagem!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    });
}

function configurar() {
    // Se houver erros, exibe um alerta
    var maxVar = document.getElementById('input_parametro_maior_valor').value;
    var minVar = document.getElementById('input_parametro_menor_valor').value;
    var idUsuario = sessionStorage.ID_USUARIO;
    if (!maxVar || !minVar) {
        alert('Erro ao configurar: \n' + mensagensErro.join('\n'));
    } else {
        fetch(`/parametros/configurar/${idUsuario}`, {
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

function editar(idUsuario, email, senha, nome, cpf, dtNasc, genero) {
    var idUsuario = sessionStorage.ID_USUARIO;
    var email = document.getElementById(`email`).value
    var senha = document.getElementById(`senha`).value
    var nome = document.getElementById(`nome`).value
    var cpf = document.getElementById(`cpf`).value
    var dtNasc = document.getElementById(`nascimento`).value
    var genero = document.getElementById(`genero`).value;


    fetch(`/municipios/editar/${idUsuario}/${email}/${senha}/${nome}/${cpf}/${dtNasc}/${genero}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        if (resposta.ok) {
            sessionStorage.EMAIL_USUARIO = email;
            sessionStorage.NOME_USUARIO = nome;
            sessionStorage.CPF_USUARIO = cpf;
            sessionStorage.GENERO_USUARIO = genero;
            sessionStorage.SENHA_USUARIO = senha;
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

function exibir(idUsuario) {
    var idUsuario = sessionStorage.ID_USUARIO;
    fetch(`/parametros/exibir/${idUsuario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO listar()!");

        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json); // Verifique o conteúdo retornado

                   sessionStorage.PARAMETRO_MINIMO = json.min;
                   sessionStorage.PARAMETRO_MAXIMO = json.max;

            });

        } else {
            console.log("Houve um erro ao tentar realizar a listagem!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    });
}
