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
        alert("Informações salvas com sucesso!");
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

