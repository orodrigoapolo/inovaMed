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
        alert("Informações salvas com sucesso!");
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
        
        alert("Parâmetros salvos com sucesso!");
    };

});
