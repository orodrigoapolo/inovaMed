function listar() {
  var idUsuario = sessionStorage.ID_USUARIO;

  fetch(`/usuarios/listar/${idUsuario}`, {
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

        sessionStorage.NOME_USUARIO = json[0].nome;
        sessionStorage.CPF = json[0].cpf;
        sessionStorage.EMAIL = json[0].email;
        sessionStorage.CARGO = json[0].cargo
        sessionStorage.DT_NASC = json[0].dtNasc;
        sessionStorage.GENERO = json[0].genero;
        sessionStorage.DT_CRIACAO = json[0].dtCriacao;

        email.value = json[0].email;
        nome.value = json[0].nome;
        cpf.value = json[0].cpf;
        cargo.value = json[0].cargo;
        estado.value = json[0].estado;

        var dataCompleta = new Date(sessionStorage.DT_NASC);
        var ano = dataCompleta.getFullYear();
        var mes = String(dataCompleta.getMonth() + 1).padStart(2, '0');
        var dia = String(dataCompleta.getDate()).padStart(2, '0');

        var dataFormatada = `${ano}-${mes}-${dia}`;

        nascimento.value = dataFormatada;


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