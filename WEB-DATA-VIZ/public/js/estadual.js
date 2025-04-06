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

// seleção dos filtros de dashboard

ipt_regiao_norte.addEventListener('change', () => {
    if (ipt_regiao_norte.checked) {
        div_regiao_norte.classList.add("opcao-filtro-estadual-selecionado")
        div_regiao_norte.classList.remove("opcao-filtro-estadual")
    } else {
        div_regiao_norte.classList.remove("opcao-filtro-estadual-selecionado")
        div_regiao_norte.classList.add("opcao-filtro-estadual")
    }
})
ipt_acre.addEventListener('change', () => {
    if (ipt_acre.checked) {
        div_acre.classList.add("opcao-filtro-estadual-selecionado")
        div_acre.classList.remove("opcao-filtro-estadual")
    } else {
        div_acre.classList.remove("opcao-filtro-estadual-selecionado")
        div_acre.classList.add("opcao-filtro-estadual")
    }
})
ipt_amapa.addEventListener('change', () => {
    if (ipt_amapa.checked) {
        div_amapa.classList.add("opcao-filtro-estadual-selecionado")
        div_amapa.classList.remove("opcao-filtro-estadual")
    } else {
        div_amapa.classList.remove("opcao-filtro-estadual-selecionado")
        div_amapa.classList.add("opcao-filtro-estadual")
    }
})
ipt_amazonas.addEventListener('change', () => {
    if (ipt_amazonas.checked) {
        div_amazonas.classList.add("opcao-filtro-estadual-selecionado")
        div_amazonas.classList.remove("opcao-filtro-estadual")
    } else {
        div_amazonas.classList.remove("opcao-filtro-estadual-selecionado")
        div_amazonas.classList.add("opcao-filtro-estadual")
    }
})
ipt_para.addEventListener('change', () => {
    if (ipt_para.checked) {
        div_para.classList.add("opcao-filtro-estadual-selecionado")
        div_para.classList.remove("opcao-filtro-estadual")
    } else {
        div_para.classList.remove("opcao-filtro-estadual-selecionado")
        div_para.classList.add("opcao-filtro-estadual")
    }
})
ipt_rondonia.addEventListener('change', () => {
    if (ipt_rondonia.checked) {
        div_rondonia.classList.add("opcao-filtro-estadual-selecionado")
        div_rondonia.classList.remove("opcao-filtro-estadual")
    } else {
        div_rondonia.classList.remove("opcao-filtro-estadual-selecionado")
        div_rondonia.classList.add("opcao-filtro-estadual")
    }
})
ipt_roraima.addEventListener('change', () => {
    if (ipt_roraima.checked) {
        div_roraima.classList.add("opcao-filtro-estadual-selecionado")
        div_roraima.classList.remove("opcao-filtro-estadual")
    } else {
        div_roraima.classList.remove("opcao-filtro-estadual-selecionado")
        div_roraima.classList.add("opcao-filtro-estadual")
    }
})
ipt_tocantins.addEventListener('change', () => {
    if (ipt_tocantins.checked) {
        div_tocantins.classList.add("opcao-filtro-estadual-selecionado")
        div_tocantins.classList.remove("opcao-filtro-estadual")
    } else {
        div_tocantins.classList.remove("opcao-filtro-estadual-selecionado")
        div_tocantins.classList.add("opcao-filtro-estadual")
    }
})

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
});
