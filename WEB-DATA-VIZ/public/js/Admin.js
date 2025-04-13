function abrirDashboard() {
    dash_admin.style.display = "flex"
    dash_perfil.style.display = "none"
    dash_config.style.display = "none"
}

function abrirPerfil() {
    dash_admin.style.display = "none"
    dash_perfil.style.display = "block"
    dash_config.style.display = "none"
}

function abrirConfiguracoes() {
    dash_admin.style.display = "none"
    dash_perfil.style.display = "none"
    dash_config.style.display = "flex"
}

document.addEventListener('DOMContentLoaded', () => {
    const btnEditar = document.querySelector('.btn-editar');
    const btnExcluir = document.querySelector('.btn-excluir');
    const btnAdicionar = document.querySelector('.btn-adicionar');
    const campos = document.querySelectorAll('.input-field');

    const modal = document.getElementById('modalExcluir');
    const btnCancelarExclusao = document.getElementById('btnCancelarExclusao');
    const btnConfirmarExclusao = document.getElementById('btnConfirmarExclusao');

    let editando = false;

    // Ativar/Desativar edição
    btnEditar.addEventListener('click', () => {
        editando = !editando;
        campos.forEach(campo => {
            campo.disabled = !editando;
        });
        btnEditar.innerHTML = editando
            ? '<i class="fa-solid fa-check"></i>' 
            : '<i class="fa-solid fa-pencil"></i>';      

        if (!editando) {
            salvarEdicao();
        }
    });

    // Excluir usuário (exibe modal)
    btnExcluir.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    // Confirmar exclusão
    btnConfirmarExclusao.addEventListener('click', () => {
        limparFormulario();
        modal.classList.add('hidden');
        alert('Usuário excluído com sucesso!');
    });

    // Cancelar exclusão
    btnCancelarExclusao.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Adicionar novo usuário
    btnAdicionar.addEventListener('click', () => {
        limparFormulario();
        campos.forEach(campo => campo.disabled = false);
        btnEditar.innerHTML = '<i class="fa-solid fa-check"></i>';
        editando = true;
    });

    function salvarEdicao() {
        const dados = {};
        campos.forEach(campo => {
            dados[campo.id] = campo.value;
        });
        console.log('Dados salvos:', dados);
        alert('Dados salvos com sucesso!');
    }

    function limparFormulario() {
        campos.forEach(campo => campo.value = '');
    }
});
