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

                    const containerCards = document.getElementById('cards_usuarios');
                    containerCards.innerHTML = '';

                    for (let i = 0; i < json.length; i++) {
                        var dataCompleta = new Date(json[i].dtNasc);
                        var dia = String(dataCompleta.getDate()).padStart(2, '0');
                        var mes = String(dataCompleta.getMonth() + 1).padStart(2, '0');
                        var ano = dataCompleta.getFullYear();
                        var dataFormatada = `${ano}-${mes}-${dia}`;
                        var nascimento = dataFormatada;

                        // Se o cargo for "coordenador_municipal", cria o campo Município
                        var campoMunicipio = "";
                        if (json[i].cargo === "coordenador_municipal") {
                            campoMunicipio = `
                                <div class="input-item">
                                    <label for="municipio">Município</label>
                                     <i class="fa fa-map-marker-alt"></i>
                                    <input type="text" id="municipio${i}" value="${json[i].nomeMunicipio}" class="input-field" disabled>
                                </div>
                            `;
                        }

                        containerCards.innerHTML += `
                        <div id="card-usuario-${json[i].idUsuario}" class="Perfil-edicao">
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
                                        <option value="administrador" ${json[i].cargo === "administrador" ? "selected" : ""}>Administrador</option>
                                    </select>
                                </div>

                                ${campoMunicipio} <!-- aqui que insere o municipio, se tiver -->

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

                                <div class="input-item">
                                    <label for="senha">Senha</label>
                                    <i class="fa fa-lock"></i>
                                    <input type="password" id="senha${i}" value="${json[i].senha}" class="input-field" placeholder="Digite sua senha" disabled>
                                </div>
                            </div>

                            <div id="validacao-senha">
                                <div class="validacao-item">
                                    <i id="icone-tamanho" class="fa fa-lock"></i>
                                    <p id="validacao-tamanho">Mínimo 8 caracteres</p>
                                </div>
                                <div class="validacao-item">
                                    <i id="icone-maiuscula" class="fa fa-lock"></i>
                                    <p id="validacao-maiuscula">Pelo menos uma letra maiúscula</p>
                                </div>
                                <div class="validacao-item">
                                    <i id="icone-minuscula" class="fa fa-lock"></i>
                                    <p id="validacao-minuscula">Pelo menos uma letra minúscula</p>
                                </div>
                                <div class="validacao-item">
                                    <i id="icone-numero" class="fa fa-lock"></i>
                                    <p id="validacao-numero">Pelo menos um número</p>
                                </div>
                                <div class="validacao-item">
                                    <i id="icone-caractere" class="fa fa-lock"></i>
                                    <p id="validacao-caractere">Pelo menos um caractere especial</p>
                                </div>
                            </div>

                            <div class="acoes-usuario">
                                <button class="btn-editar"><i class="fa-solid fa-pencil"></i></button>
                                <button class="btn-excluir"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </div>`;
                    }

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


function buscar(nome, email, cpf, cargo, genero) {
    const pesquisa = document.getElementById('barra_pesquisa').value;
    var nome = pesquisa;
    var email = pesquisa;
    var cpf = pesquisa;
    var cargo = pesquisa;
    var genero = pesquisa;
    if (pesquisa == "") {
        listar()
    } else {
        fetch(`/usuarios/buscar/${nome}/${email}/${cpf}/${cargo}/${genero}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO buscar()!");

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

                            // Se o cargo for "coordenador_municipal", cria o campo Município
                            var campoMunicipio = "";
                            if (json[i].cargo === "coordenador_municipal") {
                                campoMunicipio = `
                                <div class="input-item">
                                    <label for="municipio">Município</label>
                                     <i class="fa fa-map-marker-alt"></i>
                                    <input type="text" id="municipio${i}" value="${json[i].nomeMunicipio}" class="input-field" disabled>
                                </div>
                            `;
                            }

                            containerCards.innerHTML += `
                        <div id="card-usuario-${json[i].idUsuario}" class="Perfil-edicao">
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
                                        <option value="administrador" ${json[i].cargo === "administrador" ? "selected" : ""}>Administrador</option>
                                    </select>
                                </div>

                                ${campoMunicipio} <!-- aqui que insere o municipio, se tiver -->

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
                                <div class="input-item">
                                    <label for="senha">Senha</label>
                                    <i class="fa fa-lock"></i>
                                    <input type="password" id="senha${i}" value="${json[i].senha}" class="input-field" placeholder="Digite sua senha" disabled>
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
                console.log("Houve um erro ao tentar realizar a busca!");
                resposta.text().then(texto => {
                    console.error(texto);
                });
            }

        }).catch(function (erro) {
            console.log(erro);
        });
    }
}

function deletarUsuario(idUsuario) {
    console.log("Criar função de apagar post escolhido - ID" + idUsuario);
    fetch(`/usuarios/deletarUsuario/${idUsuario}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        if (resposta.ok) {
            window.alert(`Usuário deletado com sucesso!`);
            window.location.reload()
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar deletar usuário! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function editar(idUsuario, email, senha, nome, cpf, cargo, estado, dtNasc, genero) {
    var idUsuario = sessionStorage.ID_CONTAINER;
    var email = document.getElementById(`email${idUsuario - 1}`).value;
    var senha = document.getElementById(`senha${idUsuario - 1}`).value;
    var nome = document.getElementById(`nome${idUsuario - 1}`).value;
    var cpf = document.getElementById(`cpf${idUsuario - 1}`).value;
    var cargo = document.getElementById(`cargo${idUsuario - 1}`).value;
    var estado = document.getElementById(`estado${idUsuario - 1}`).value;
    var dtNasc = document.getElementById(`nascimento${idUsuario - 1}`).value;
    var genero = document.getElementById(`genero${idUsuario - 1}`).value;

    fetch(`/usuarios/editar/${idUsuario}/${email}/${senha}/${nome}/${cpf}/${cargo}/${estado}/${dtNasc}/${genero}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        if (resposta.ok) {
            window.alert(`Usuário editado com sucesso!`);
            listar();
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar editar usuário! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
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
    listaUsuarios.style.display = "block"
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

        const campos = document.querySelectorAll(`#email${i}, #nome${i}, #cpf${i}, #cargo${i}, #estado${i}, #nascimento${i}, #genero${i}, #senha${i}`);
        let editando = false;


        // AQUI COMEÇA A VALIDAÇÃO DE SENHA AO DIGITAR
        const campoSenha = document.querySelector(`#senha${i}`);
        const card = document.querySelector(`#card-usuario-${json[i].idUsuario}`);

        const iconeTamanho = card.querySelector('#icone-tamanho');
        const iconeMaiuscula = card.querySelector('#icone-maiuscula');
        const iconeMinuscula = card.querySelector('#icone-minuscula');
        const iconeNumero = card.querySelector('#icone-numero');
        const iconeCaractere = card.querySelector('#icone-caractere');

        campoSenha.addEventListener('input', () => {
            const senha = campoSenha.value;

            iconeTamanho.classList.toggle('green', senha.length >= 8);
            iconeTamanho.classList.toggle('red', senha.length < 8);

            iconeMaiuscula.classList.toggle('green', /[A-Z]/.test(senha));
            iconeMaiuscula.classList.toggle('red', !/[A-Z]/.test(senha));

            iconeMinuscula.classList.toggle('green', /[a-z]/.test(senha));
            iconeMinuscula.classList.toggle('red', !/[a-z]/.test(senha));

            iconeNumero.classList.toggle('green', /\d/.test(senha));
            iconeNumero.classList.toggle('red', !/\d/.test(senha));

            iconeCaractere.classList.toggle('green', /[!@#$%^&*(),.?":{}|<>]/.test(senha));
            iconeCaractere.classList.toggle('red', !/[!@#$%^&*(),.?":{}|<>]/.test(senha));
        });



        btnEditar.addEventListener('click', () => {
            sessionStorage.ID_CONTAINER = json[i].idUsuario;
            sessionStorage.NOME_CONTAINER = json[i].nome;
            sessionStorage.CPF_CONTAINER = json[i].cpf;
            sessionStorage.EMAIL_CONTAINER = json[i].email;
            sessionStorage.CARGO_CONTAINER = json[i].cargo;

            var dataCompleta = new Date(json[i].dtNasc);
            var dia = String(dataCompleta.getDate()).padStart(2, '0');
            var mes = String(dataCompleta.getMonth() + 1).padStart(2, '0');
            var ano = dataCompleta.getFullYear();
            var dataFormatada = `${ano}-${mes}-${dia}`;

            sessionStorage.DTNASC_CONTAINER = dataFormatada;
            sessionStorage.GENERO_CONTAINER = json[i].genero;
            sessionStorage.ESTADO_CONTAINER = json[i].fkEstado;
            editando = !editando;
            campos.forEach(campo => campo.disabled = !editando);
            btnEditar.innerHTML = editando
                ? '<i class="fa-solid fa-check"></i>'
                : '<i class="fa-solid fa-pencil"></i>';

            if (!editando) {
                editar();
            }
        });


        btnExcluir.addEventListener('click', () => {
            const modalExcluir = document.getElementById('modalExcluir');
            const btnCancelarExclusao = document.getElementById('btnCancelarExclusao');
            const btnConfirmarExclusao = document.getElementById('btnConfirmarExclusao');


            modalExcluir.classList.remove('hidden');

            btnCancelarExclusao.addEventListener('click', () => {
                modalExcluir.classList.add('hidden');
            });


            btnConfirmarExclusao.addEventListener('click', () => {
                btnConfirmarExclusao.addEventListener('click', () => {
                    const usuarioId = json[i].idUsuario;

                    fetch(`/usuarios/deletarUsuario/${usuarioId}`, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(resposta => {
                        if (resposta.ok) {
                            alert('Usuário excluído com sucesso!');

                            const cardUsuario = document.getElementById(`card-usuario-${usuarioId}`);
                            if (cardUsuario) cardUsuario.remove();
                        } else {
                            alert('Erro ao excluir o usuário.');
                        }
                        modalExcluir.classList.add('hidden');
                    }).catch(erro => {
                        console.log(erro);

                        modalExcluir.classList.add('hidden');
                    });
                });
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    listar();
});

function criarCardVazio() {
    const containerCards = document.getElementById('cards_usuarios');
    const novoCard = document.createElement('div');
    novoCard.classList.add('Perfil-edicao');

    novoCard.innerHTML = `
        <div class="input-group" >
                    <div class="input-item">
                        <label for="email">E-mail</label>
                        <i class="fa fa-envelope"></i>
                        <input type="email" id="email" class="input-field" disabled>
                    </div>

                    <div class="input-item">
                        <label for="nome">Nome Completo</label>
                        <i class="fa fa-user"></i>
                        <input type="text" id="nome" class="input-field" disabled>
                    </div>

                    <div class="input-item">
                        <label for="cpf">CPF</label>
                        <i class="fa fa-id-card"></i>
                        <input type="text" maxlength="11" id="cpf" class="input-field" disabled>
                    </div>

                    <div class="input-item">
                        <label for="cargo">Cargo Exercido</label>
                        <i class="fa fa-briefcase"></i>
                        <select id="cargo" class="input-field" disabled>
                            <option value=""></option>
                            <option value="coordenador_estadual">Coordenador Estadual</option>
                            <option value="coordenador_municipal">Coordenador Municipal</option>
                            <option value="administrador">Administrador</option>
                        </select>
                    </div>

                    <div class="input-item">
                        <label for="municipio">Município</label>
                        <i class="fa fa-map-marker-alt"></i>
                        <select id="municipio" class="input-field"></select>
                    </div>

                    <div class="input-item">
                        <label for="estado">Estado em que atua</label>
                        <i class="fa fa-map-marker-alt"></i>
                        <select id="estado" oninput="listarMunicipios()" class="input-field" disabled>
                            <option value="outros"></option>
                            <option value="1">Acre</option>
                            <option value="2">Amapá</option>
                            <option value="3">Amazonas</option>
                            <option value="4">Pará</option>
                            <option value="5">Rondônia</option>
                            <option value="6">Roraima</option>
                            <option value="7">Tocantins</option>
                        </select>
                    </div>
                    <div class="input-item">
                        <label for="nascimento">Data de Nascimento</label>
                        <i class="fa fa-map-marker-alt"></i>
                        <input type="date" id="nascimento" class="input-field" disabled>
                    </div>
                    <div class="input-item">
                        <label for="genero">Gênero</label>
                        <i class="fa fa-map-marker-alt"></i>
                        <select id="genero" name="genero" class="input-field" disabled>
                            <option value=""></option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="outro">Outro</option>
                            <option value="nao_informar">Prefiro não informar</option>
                        </select>
                    </div>
                    <div class="input-item">
                        <label for="senha">Senha</label>
                        <i class="fa fa-lock"></i>
                        <input type="password" id="senha" class="input-field" placeholder="Digite sua senha">
                    </div>
                </div>
                <div id="validacao-senha">
                    <div class="validacao-item">
                        <i id="icone-tamanho" class="fa fa-lock"></i>
                        <p id="validacao-tamanho">Mínimo 8 caracteres</p>
                    </div>
                    <div class="validacao-item">
                        <i id="icone-maiuscula" class="fa fa-lock"></i>
                        <p id="validacao-maiuscula">Pelo menos uma letra maiúscula</p>
                    </div>
                    <div class="validacao-item">
                        <i id="icone-minuscula" class="fa fa-lock"></i>
                        <p id="validacao-minuscula">Pelo menos uma letra minúscula</p>
                    </div>
                    <div class="validacao-item">
                        <i id="icone-numero" class="fa fa-lock"></i>
                        <p id="validacao-numero">Pelo menos um número</p>
                    </div>
                    <div class="validacao-item">
                        <i id="icone-caractere" class="fa fa-lock"></i>
                        <p id="validacao-caractere">Pelo menos um caractere especial</p>
                    </div>
                </div>
                <div class="acoes-usuario">
                    <button class="btn-editar" onclick="novoUsuario()"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn-excluir"><i class="fas fa-trash-alt"></i></button>
                </div>
    `;

    containerCards.appendChild(novoCard);

    aplicarEventosCardEdicaoInicial(novoCard);

}

function listarMunicipios(fkEstado) {
    var fkEstado = document.getElementById('estado').value;
    fetch(`/municipios/listar/${fkEstado}`, {
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
                    
                    municipio.innerHTML = "";

                    for (let i = 0; i < json.length; i++) {
                        municipio.innerHTML += `
                    <option value="${json[i].idMunicipio}">${json[i].nome}</option>
                `
                    }

                } else {
                    console.log("Nenhum município encontrado.");
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

function aplicarEventosCardEdicaoInicial(card) {
    const btnEditar = card.querySelector('.btn-editar');
    const btnExcluir = card.querySelector('.btn-excluir');
    const campos = card.querySelectorAll('.input-field');
    let editando = true;

    campos.forEach(campo => campo.disabled = false);


    btnEditar.innerHTML = '<i class="fa-solid fa-check"></i>';
    btnExcluir.innerHTML = '<i class="fa-solid fa-times" style="color: red;"></i>';

    btnEditar.addEventListener('click', () => {
        editando = !editando;
        campos.forEach(campo => campo.disabled = !editando);
        btnEditar.innerHTML = editando
            ? '<i class="fa-solid fa-check"></i>'
            : '<i class="fa-solid fa-pencil"></i>';
        btnExcluir.innerHTML = editando
            ? '<i class="fa-solid fa-times" style="color: red;"></i>'
            : '<i class="fas fa-trash-alt"></i>';

        if (!editando) {
        }
    });

    btnExcluir.addEventListener('click', () => {
        if (editando) {
            card.remove();
            alert('Novo usuário descartado!');
        } else {
            const modalExcluir = document.getElementById('modalExcluir');
            const btnCancelar = document.getElementById('btnCancelarExclusao');
            const btnConfirmar = document.getElementById('btnConfirmarExclusao');

            modalExcluir.classList.remove('hidden');

            btnCancelar.onclick = () => {
                modalExcluir.classList.add('hidden');
            };

            btnConfirmar.onclick = () => {
                card.remove();
                modalExcluir.classList.add('hidden');
                alert('Usuário excluído com sucesso!');
            };
        }
    });

}
const validacaoItens = document.querySelectorAll('.validacao-item');
const botaoCadastrar = document.getElementById('botao-cadastrar');

document.getElementById('senha').addEventListener('input', function () {
    var senha = document.getElementById('senha').value;

    // Mostrar as validações apenas quando o usuário começar a digitar
    if (senha.length > 0) {
        validacaoItens.forEach(item => item.style.display = 'flex');
    } else {
        validacaoItens.forEach(item => item.style.display = 'none');
    }


    // Validação de tamanho mínimo
    if (senha.length >= 8) {
        document.getElementById('icone-tamanho').classList.add('green');
        document.getElementById('icone-tamanho').classList.remove('red');
    } else {
        document.getElementById('icone-tamanho').classList.add('red');
        document.getElementById('icone-tamanho').classList.remove('green');
    }


    // Validação de maiúsculas
    if (/[A-Z]/.test(senha)) {
        document.getElementById('icone-maiuscula').classList.add('green');
        document.getElementById('icone-maiuscula').classList.remove('red');
    } else {
        document.getElementById('icone-maiuscula').classList.add('red');
        document.getElementById('icone-maiuscula').classList.remove('green');
    }


    // Validação de minúsculas
    if (/[a-z]/.test(senha)) {
        document.getElementById('icone-minuscula').classList.add('green');
        document.getElementById('icone-minuscula').classList.remove('red');
    } else {
        document.getElementById('icone-minuscula').classList.add('red');
        document.getElementById('icone-minuscula').classList.remove('green');
    }


    // Validação de números
    if (/\d/.test(senha)) {
        document.getElementById('icone-numero').classList.add('green');
        document.getElementById('icone-numero').classList.remove('red');
    } else {
        document.getElementById('icone-numero').classList.add('red');
        document.getElementById('icone-numero').classList.remove('green');
    }


    // Validação de caracteres especiais
    if (/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
        document.getElementById('icone-caractere').classList.add('green');
        document.getElementById('icone-caractere').classList.remove('red');
    } else {
        document.getElementById('icone-caractere').classList.add('red');
        document.getElementById('icone-caractere').classList.remove('green');
    }
});

function validarSenha() {
    var senha = document.getElementById('senha').value;
    let mensagensErro = [];

    if (senha.length < 8) {
        mensagensErro.push('A senha precisa ter no mínimo 8 caracteres.');
    }
    if (!/[A-Z]/.test(senha)) {
        mensagensErro.push('A senha precisa de pelo menos uma letra maiúscula.');
    }
    if (!/[a-z]/.test(senha)) {
        mensagensErro.push('A senha precisa de pelo menos uma letra minúscula.');
    }
    if (!/\d/.test(senha)) {
        mensagensErro.push('A senha precisa de pelo menos um número.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
        mensagensErro.push('A senha precisa de pelo menos um caractere especial.');
    }

    return mensagensErro;
}


function validarConfirmarSenha() {
    var senha = document.getElementById('senha').value;
    var email = document.getElementById('email').value;
    var cargo = document.getElementById('cargo').value;
    var estado = document.getElementById('estado').value;
    var mensagensErro = [];

    // Validação: E-mail no formato correto
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mensagensErro.push('O e-mail precisa ser válido e conter "@" e ".com".');
    }

    // Validação: Cargo selecionado
    if (cargo === "outros" || cargo === "") {
        mensagensErro.push('Você precisa selecionar um cargo.');
    }

    // Validação: Estado selecionado
    if (estado === "outros" || estado === "") {
        mensagensErro.push('Você precisa selecionar um estado.');
    }

    // Validação: Senha
    var senhaErros = validarSenha();
    if (senhaErros.length > 0) {
        mensagensErro = mensagensErro.concat(senhaErros);
    }

    return mensagensErro;
}

function novoUsuario() {
    var mensagensErro = validarConfirmarSenha();


    // Se houver erros, exibe um alerta
    if (mensagensErro.length > 0) {
        alert('Erro ao cadastrar: \n' + mensagensErro.join('\n'));
    } else {

        // Enviando o valor da nova input
        var emailVar = document.getElementById('email').value;
        var nomeVar = document.getElementById('nome').value;
        var cpfVar = document.getElementById('cpf').value;
        var generoVar = document.getElementById('genero').value;
        var cargoVar = document.getElementById('cargo').value;
        var fkEstadoVar = document.getElementById('estado').value;
        var senhaVar = document.getElementById('senha').value;
        var dtNascVar = document.getElementById('nascimento').value;

        fetch("/usuarios/novoUsuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                emailServer: emailVar,
                nomeServer: nomeVar,
                cpfServer: cpfVar,
                generoServer: generoVar,
                cargoServer: cargoVar,
                fkEstadoServer: fkEstadoVar,
                senhaServer: senhaVar,
                dtNascServer: dtNascVar
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    //   cardErro.style.display = "block";

                    //   mensagem_erro.innerHTML =
                    //     "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                    setTimeout(() => {
                        alert('Cadastrado com sucesso!');
                        listar();
                    }, "1000");

                    //   limparFormulario();
                    //   finalizarAguardar();
                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                // finalizarAguardar();
            });


        return false;
    }
}