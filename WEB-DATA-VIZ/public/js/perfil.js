function listar() {

  fetch(`/usuarios/listar`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },

  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO entrar()!")

    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));
        console.log(json.length)


        for (i = 0; i < json.length; i++) {
          var dataCompleta = new Date(json[i].dtNasc);
          var ano = dataCompleta.getFullYear();
          var mes = String(dataCompleta.getMonth() + 1).padStart(2, '0');
          var dia = String(dataCompleta.getDate()).padStart(2, '0');

          var dataFormatada = `${ano}-${mes}-${dia}`;

          var nascimento = dataFormatada;

          listaUsuarios.innerHTML += `<div class="Perfil-edicao">

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
                        <select id="estado${i}" value="${json[i].estado}" class="input-field" disabled>
                            <option value="outros"></option>
                            <option value="acre">Acre</option>
                            <option value="amazonas">Amazonas</option>
                            <option value="roraima">Roraima</option>
                            <option value="rondonia">Rondônia</option>
                            <option value="pará">Pará</option>
                            <option value="amapá">Amapá</option>
                            <option value="tocantins">Tocantins</option>
                        </select>
                    </div>
                    <div class="input-item">
                        <label for="nascimento">Data de Nascimento</label>
                        <i class="fa fa-map-marker-alt"></i>
                        <input type="date" id="nascimento${i}" value="${nascimento}" class="input-field" disabled>
                    </div>
                    <div class="input-item">
                        <label for="genero">Gênero</label>
                        <i class="fa fa-map-marker-alt"></i>
                        <select id="genero${i}" name="genero" class="input-field" disabled>
                            <option value="" ${json[i].genero === "" ? "selected" : ""}></option>
                            <option value="Masculino" ${json[i].genero === "Masculino" ? "selected" : ""}>Masculino</option>
                            <option value="Feminino" ${json[i].genero === "Feminino" ? "selected" : ""}>Feminino</option>
                            <option value="Outro" ${json[i].genero === "Outro" ? "selected" : ""}>Outro</option>
                            <option value="Nao_informar" ${json[i].genero === "Nao_informar" ? "selected" : ""}>Prefiro não informar</option>
                        </select>
                    </div>
                </div>
                <div class="acoes-usuario">
                    <button class="btn-editar"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn-excluir"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>`
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
  })

  return false;
}