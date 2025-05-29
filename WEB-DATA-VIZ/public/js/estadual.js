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
    // listarContato();
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


    window.editarInformacoesContato = function (botao) {
        const container = botao.closest('.contato-container');
        const inputEmailContato = container.querySelector('.input_email_contato');
        const btnSalvarContato = container.querySelector('.btn-salvar');
        const btnDescartarContato = container.querySelector('.btn-descartar');
        const btnEditarContato = container.querySelector('.btn-editar');

        if (inputEmailContato && btnSalvarContato && btnDescartarContato && btnEditarContato) {
            inputEmailContato.dataset.originalValue = inputEmailContato.value;

            inputEmailContato.disabled = false;

            btnSalvarContato.style.display = 'inline-block';
            btnDescartarContato.style.display = 'inline-block';
            btnEditarContato.style.display = 'none';
        } else {
            console.error("Algum elemento não foi encontrado no container de contato.");
        }
    };


    window.descartarEdicaoContato = function (botao) {

        const container = botao.closest('.contato-container');
        const inputEmailContato = container.querySelector('.input_email_contato');
        const btnSalvarContato = container.querySelector('.btn-salvar');
        const btnDescartarContato = container.querySelector('.btn-descartar');
        const btnEditarContato = container.querySelector('.btn-editar');

        if (inputEmailContato && btnSalvarContato && btnDescartarContato && btnEditarContato) {
            inputEmailContato.disabled = true;

            btnSalvarContato.style.display = 'none';
            btnDescartarContato.style.display = 'none';
            btnEditarContato.style.display = 'inline-block';

            inputEmailContato.value = inputEmailContato.dataset.originalValue || '';
            alert("Contato descartado com sucesso!");
        } else {
            console.error("Algum elemento não foi encontrado no container de contato.");
        }



    };

    window.salvarInformacoesContato = function (botao) {
        const container = botao.closest('.contato-container');
        const inputEmailContato = container.querySelector('.input_email_contato');
        const btnSalvarContato = container.querySelector('.btn-salvar');
        const btnDescartarContato = container.querySelector('.btn-descartar');
        const btnEditarContato = container.querySelector('.btn-editar');

        if (inputEmailContato && btnSalvarContato && btnDescartarContato && btnEditarContato) {
            inputEmailContato.disabled = true;

            btnSalvarContato.style.display = 'none';
            btnDescartarContato.style.display = 'none';
            btnEditarContato.style.display = 'inline-block';

            configurarContato(inputEmailContato);
        } else {
            console.error("Algum elemento não foi encontrado no container de contato.");
        }

    };

    window.deletarContatoWindow = function (botao) {
        const container = botao.closest('.contato-container');
        const inputEmailContato = container.querySelector('.input_email_contato');
        const btnSalvarContato = container.querySelector('.btn-salvar');
        const btnDescartarContato = container.querySelector('.btn-descartar');
        const btnEditarContato = container.querySelector('.btn-editar');

        if (inputEmailContato && btnSalvarContato && btnDescartarContato && btnEditarContato) {

            deletarContato(inputEmailContato);
        } else {
            console.error("Algum elemento não foi encontrado no container de contato.");
        }

    };

    window.descartarEdicaoNovoContato = function (botao) {

        const container = botao.closest('.contato-container');
        const inputEmailContato = container.querySelector('.input_email_contato');
        const btnSalvarContato = container.querySelector('.btn-salvar');
        const btnDescartarContato = container.querySelector('.btn-descartar');

        if (inputEmailContato && btnSalvarContato && btnDescartarContato) {
            container.remove();
            alert("Contato descartado com sucesso!");
        } else {
            console.error("Algum elemento não foi encontrado no container de contato.");
        }

    };

    window.salvarInformacoesNovoContato = function (botao) {
        const container = botao.closest('.contato-container');
        const inputEmailContato = container.querySelector('.input_email_contato');
        const btnSalvarContato = container.querySelector('.btn-salvar');
        const btnDescartarContato = container.querySelector('.btn-descartar');

        if (inputEmailContato && btnSalvarContato && btnDescartarContato) {

            configurarNovoContato(inputEmailContato);
        } else {
            console.error("Algum elemento não foi encontrado no container de contato.");
        }

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

function listarContato() {
    var idUsuario = sessionStorage.ID_USUARIO;
    fetch(`/contatoAvisos/listarContato/${idUsuario}`, {
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
                    console.log("Número de contatos:", json.length);

                    const containerCards = document.getElementById('card_contatos');
                    containerCards.innerHTML = '';

                    for (let i = 0; i < json.length; i++) {

                        containerCards.innerHTML = `
                             <div class="contato-container">
                                <div class="contato-container-cima">
                                    <h1 class="nome-contato" id="nome_contato">
                                        Contato ${i + 1}
                                    </h1>
                                    <div class="excluir-contato">
                                        <img src="assets/icon/trash.png">
                                    </div>
                                </div>
                                <div class="contato-container-input">
                                    <p class="email-contato">
                                        Email
                                    </p>
                                    <input type="text" id="input_email_contato" disabled>
                                </div>
                                <div class="botoes-acoes-contato">
                                    <button class="btn-editar" id="btn-editar-contato" onclick="editarInformacoesContato()">
                                        <i class="fas fa-pen"></i> Editar Informações
                                    </button>
                                    <button class="btn-descartar" id="btn-descartar-contato" onclick="descartarEdicaoContato()"
                                        style="display: none;">
                                        <i class="fas fa-times"></i> Descartar
                                    </button>
                                    <button class="btn-salvar" id="btn-salvar-contato" onclick="salvarInformacoesContato()"
                                        style="display: none;">
                                        <i class="fas fa-save"></i> Salvar Informações
                                    </button>
                                </div>
                            </div>
                        `
                    }

                } else {
                    console.log("Nenhum usuário encontrado.");
                }
            });

        } else {
            console.log("Houve um erro ao tentar realizar a listagem do ContatoAvisos!");
            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    });
}

function configurarContato(input) {
    // Se houver erros, exibe um alerta
    var emailVar = input.value;
    var idUsuario = sessionStorage.ID_USUARIO;
    var valorOriginalVar = input.dataset.originalValue;

    // const input = document.querySelector('.input_email_contato');
    console.log(emailVar);
    console.log(valorOriginalVar);

    fetch(`/contatoAvisos/configurarContato/${idUsuario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emailServer: emailVar,
            originalServer: valorOriginalVar
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

function configurarNovoContato(input) {
    var emailVar = input.value;
    var idUsuario = sessionStorage.ID_USUARIO;

    // const input = document.querySelector('.input_email_contato');
    console.log(emailVar);

    fetch(`/contatoAvisos/configurarPrimeiroContato/${idUsuario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emailServer: emailVar,
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                window.alert(`Configuração realizada com sucesso!`);
                window.location.reload()
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

                const containerCards = document.getElementById('card_contatos');
                containerCards.innerHTML = `
                            <div class="contato-container-inexistente">
                                <h1 class="nome-contato" id="nome_contato">
                                    Nenhum contato cadastrado
                                </h1>
                            </div>
                    `
                return;
            }

            const param = JSON.parse(text);
            console.log("Contatos existentes:", param);

            const containerCards = document.getElementById('card_contatos');
            containerCards.innerHTML = '';

            for (let i = 0; i < param.length; i++) {

                containerCards.innerHTML += `
                                 <div class="contato-container" id="contato-container-${param[i]}">
                                    <div class="contato-container-cima">
                                        <h1 class="nome-contato" id="nome_contato">
                                            Contato ${i + 1}
                                        </h1>
                                        <div class="excluir-contato" onclick="deletarContatoWindow(this)">
                                            <img src="assets/icon/trash.png">
                                        </div>
                                    </div>
                                    <div class="contato-container-input">
                                        <p class="email-contato">
                                            Email
                                        </p>
                                        <input type="text" id="input_email_contato"
                                            class="input_email_contato" 
                                            value="${param[i].email}" 
                                            disabled 
                                            data-original-value="${param[i].email}"
                                        >
                                    </div>
                                    <div class="botoes-acoes-contato">
                                        <button class="btn-editar" id="btn-editar-contato" onclick="editarInformacoesContato(this)">
                                            <i class="fas fa-pen"></i> Editar Informações
                                        </button>
                                        <button class="btn-descartar" id="btn-descartar-contato" onclick="descartarEdicaoContato(this)"
                                            style="display: none;">
                                            <i class="fas fa-times"></i> Descartar
                                        </button>
                                        <button class="btn-salvar" id="btn-salvar-contato" onclick="salvarInformacoesContato(this)"
                                            style="display: none;">
                                            <i class="fas fa-save"></i> Salvar Informações
                                        </button>
                                    </div>
                                </div>
                            `
            }
        })
        .catch(erro => {
            console.error("Erro ao verificar contato:", erro);
        });
}

function deletarContato(input) {
    var emailVar = input.value;
    var idUsuario = sessionStorage.ID_USUARIO;

    console.log(emailVar);

    fetch(`/contatoAvisos/deletarContato/${idUsuario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emailServer: emailVar,
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                window.alert(`Usuário deletado com sucesso!`);
                window.location.reload()
            } else {
                throw "Houve um erro ao tentar realizar a configuração!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

}

function adicionarCardVazio() {

    const containerCards = document.getElementById('card_contatos');
    const novoCard = document.createElement('div');

    novoCard.innerHTML += `
                                 <div class="contato-container" id="contato-container">
                                    <div class="contato-container-cima">
                                        <h1 class="nome-contato" id="nome_contato">
                                            Novo contato
                                        </h1>
                                    </div>
                                    <div class="contato-container-input">
                                        <p class="email-contato">
                                            Email
                                        </p>
                                        <input type="text" id="input_email_contato"
                                            class="input_email_contato" 
                                            value=""  
                                            data-original-value=""
                                        >
                                    </div>
                                    <div class="botoes-acoes-contato">
                                        <button class="btn-editar" id="btn-editar-contato" onclick="editarInformacoesContato(this)" style="display: none">
                                            <i class="fas fa-pen"></i> Editar Informações
                                        </button>
                                        <button class="btn-descartar" id="btn-descartar-contato" onclick="descartarEdicaoNovoContato(this)"
                                            style="display: inline-block;">
                                            <i class="fas fa-times"></i> Descartar
                                        </button>
                                        <button class="btn-salvar" id="btn-salvar-contato" onclick="salvarInformacoesNovoContato(this)"
                                            style="display: inline-block;">
                                            <i class="fas fa-save"></i> Salvar Informações
                                        </button>
                                    </div>
                                </div>
                            `
    containerCards.prepend(novoCard);
}