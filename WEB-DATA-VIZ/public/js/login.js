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

                sessionStorage.EMAIL_USUARIO = json[0].email;
                sessionStorage.SENHA_USUARIO = json[0].senha;
                sessionStorage.ID_USUARIO = json[0].idUsuario;
                sessionStorage.NOME_USUARIO = json[0].nome;

                setTimeout(() => {
                    alert('Logado!');
                    window.location = "Admin.html";
                }, "1000");
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