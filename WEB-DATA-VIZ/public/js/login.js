function entrar() {
    var emailVar = loginn.value;
    var senhaVar = password.value;

    if (emailVar == "" || senhaVar == "") {
        alert('Preencha os campos corretamente!')
        return false;
    }

    console.log('FORM LOGIN: ', emailVar)
    console.log('FORM SENHA: ', senhaVar)

    fetch("usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta)

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.SENHA_USUARIO = json.senha;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.CPF_USUARIO = json.cpf;
                sessionStorage.CARGO_USUARIO = json.cargo;
                sessionStorage.DT_NASC = json.dtNasc;
                sessionStorage.GENERO_USUARIO = json.genero;
                sessionStorage.DT_INATIVO = json.dtInativo;

                if (json.dtInativo == null) {
                    alert('Logado com sucesso'); 
                    if (json.cargo == 'administrador') {
                        window.location = "Admin.html";
                    } else if (json.cargo == 'coordenador_estadual') {
                        window.location = "estadual.html";
                    } else if (json.cargo == 'coordenador_municipal') {
                        window.location = "municipal.html";
                    }
                } else {
                    alert('Usuário está inativo, entre em contato com o suporte para restaurá-lo');
                }

            });
        } else {
            console.log('Houve um erro ao tentar realizar o login!');

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}