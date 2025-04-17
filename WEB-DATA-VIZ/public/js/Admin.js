function listar() {
    fetch(`/usuarios/listar`, {
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
                    
                    // Limpar os cards de usuários antes de adicionar novamente
                    const containerCards = document.getElementById('cards_usuarios');
                    containerCards.innerHTML = '';

                    for (let i = 0; i < json.length; i++) {
                        var dataCompleta = new Date(json[i].dtNasc);
                        var dia = String(dataCompleta.getDate()).padStart(2, '0');
                        var mes = String(dataCompleta.getMonth() + 1).padStart(2, '0');
                        var ano = dataCompleta.getFullYear();
                        var dataFormatada = `${ano}-${mes}-${dia}`;

                        var nascimento = dataFormatada;

                        containerCards.innerHTML += `
                        <div class="Perfil-edicao">
                            <div class="input-group">
                                <div class="input-item">
                                    <label for="email">E-mail</label>
                                    <i class="fa fa-envelope"></i>
                                    <input type="email" id="email${i}" value="${json[i].email}" class="input-field" disabled>
                                </div>

                                <div class="input-item">
                                    <label for="nome">Nome Completo</label>
                                    <i class="fa fa-user"></i>
                                    <input type="text" id="nome${i}" value="${json[i].nome}" class="input-field" disabled>
                                </div>

                                <div class="input-item">
                                    <label for="cpf">CPF</label>
                                    <i class="fa fa-id-card"></i>
                                    <input type="text" maxlength="11" id="cpf${i}" value="${json[i].cpf}" class="input-field" disabled>
                                </div>

                                <div class="input-item">
                                    <label for="cargo">Cargo Exercido</label>
                                    <i class="fa fa-briefcase"></i>
                                    <select id="cargo${i}" class="input-field" disabled>
                                        <option value="" ${json[i].cargo === "" ? "selected" : ""}></option>
                                        <option value="coordenador_estadual" ${json[i].cargo === "coordenador_estadual" ? "selected" : ""}>Coordenador Estadual</option>
                                        <option value="coordenador_municipal" ${json[i].cargo === "coordenador_municipal" ? "selected" : ""}>Coordenador Municipal</option>
                                    </select>
                                </div>

                                <div class="input-item">
                                    <label for="estado">Estado em que atua</label>
                                    <i class="fa fa-map-marker-alt"></i>
                                    <select id="estado${i}" class="input-field" disabled>
                                        <option value="outros" ${json[i].fkEstado === "" ? "selected" : ""}></option>
                                        <option value="1" ${json[i].fkEstado === 1 ? "selected" : ""}>Acre</option>
                                        <option value="2" ${json[i].fkEstado === 2 ? "selected" : ""}>Amapá</option>
                                        <option value="3" ${json[i].fkEstado === 3 ? "selected" : ""}>Amazonas</option>
                                        <option value="4" ${json[i].fkEstado === 4 ? "selected" : ""}>Pará</option>
                                        <option value="5" ${json[i].fkEstado === 5 ? "selected" : ""}>Rondônia</option>
                                        <option value="6" ${json[i].fkEstado === 6 ? "selected" : ""}>Roraima</option>
                                        <option value="7" ${json[i].fkEstado === 7 ? "selected" : ""}>Tocantins</option>
                                    </select>
                                </div>

                                <div class="input-item">
                                    <label for="nascimento">Data de Nascimento</label>
                                    <i class="fa fa-calendar"></i>
                                    <input type="date" id="nascimento${i}" value="${nascimento}" class="input-field" disabled>
                                </div>

                                <div class="input-item">
                                    <label for="genero">Gênero</label>
                                    <i class="fa fa-transgender"></i>
                                    <select id="genero${i}" class="input-field" disabled>
                                        <option value="" ${json[i].genero === "" ? "selected" : ""}></option>
                                        <option value="masculino" ${json[i].genero === "masculino" ? "selected" : ""}>Masculino</option>
                                        <option value="feminino" ${json[i].genero === "feminino" ? "selected" : ""}>Feminino</option>
                                        <option value="outros" ${json[i].genero === "Outros" ? "selected" : ""}>Outros</option>
                                        <option value="nao_informar" ${json[i].genero === "Prefiro não informar" ? "selected" : ""}>Prefiro não informar</option>
                                    </select>
                                </div>
                            </div>

                            <div class="acoes-usuario">
                                <button class="btn-editar"><i class="fa-solid fa-pencil"></i></button>
                                <button class="btn-excluir"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </div>`;
                    }

                    // Adiciona os eventos de edição e exclusão aos botões
                    adicionarEventosBotoes(json);


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

function abrirDashboard() {
    dash_admin.style.display = "flex"
    dash_perfil.style.display = "none"
    dash_config.style.display = "none"
}

function abrirPerfil() {
    dash_admin.style.display = "none"
    dash_perfil.style.display = "block"
    dash_config.style.display = "none"
    listar();
}

function abrirConfiguracoes() {
    dash_admin.style.display = "none"
    dash_perfil.style.display = "none"
    dash_config.style.display = "flex"
}
function adicionarEventosBotoes(json) {
    for (let i = 0; i < json.length; i++) {
        const btnEditar = document.querySelectorAll('.btn-editar')[i];
        const btnExcluir = document.querySelectorAll('.btn-excluir')[i];

        const campos = document.querySelectorAll(`#email${i}, #nome${i}, #cpf${i}, #cargo${i}, #estado${i}, #nascimento${i}, #genero${i}`);
        let editando = false;

        // Evento de editar
        btnEditar.addEventListener('click', () => {
            editando = !editando;
            campos.forEach(campo => campo.disabled = !editando);
            btnEditar.innerHTML = editando
                ? '<i class="fa-solid fa-check"></i>' // Mostrar o ícone de salvar
                : '<i class="fa-solid fa-pencil"></i>'; // Mostrar o ícone de editar

            if (!editando) {
                // Salvar os dados (se necessário)
                const dados = {
                    email: document.getElementById(`email${i}`).value,
                    nome: document.getElementById(`nome${i}`).value,
                    cpf: document.getElementById(`cpf${i}`).value,
                    cargo: document.getElementById(`cargo${i}`).value,
                    estado: document.getElementById(`estado${i}`).value,
                    nascimento: document.getElementById(`nascimento${i}`).value,
                    genero: document.getElementById(`genero${i}`).value
                };
                console.log('Dados salvos:', dados);
                alert('Dados salvos com sucesso!');
            }
        });

        // Evento de excluir
        btnExcluir.addEventListener('click', () => {
            const confirmacao = confirm("Deseja realmente excluir esse usuário?");
            if (confirmacao) {
                document.querySelectorAll('.Perfil-edicao')[i].remove();
                alert('Usuário excluído com sucesso!');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    listar();
});
