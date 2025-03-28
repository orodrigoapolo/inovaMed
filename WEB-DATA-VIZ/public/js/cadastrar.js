function cadastrar() {
    var emailVar = email.value;
    var nomeVar = nome.value;
    var cpfVar = cpf.value;
    var codUnidadeVar = codigo_empresa.value;
    var cargoVar = cargo.value;
    var estadoVar = estado.value;
    var senhaVar = senha.value;
    var dtNascVar = nascimento.value;
    
    // Verificando se há algum campo em branco
    if (!checkNome() && !checkEmail() && !checkSenha() && !checkConfirmarSenha()) {
        //   cardErro.style.display = "block";
        //   mensagem_erro.innerHTML =
        //     "(Mensagem de erro para todos os campos em branco)";

        //   finalizarAguardar();
        return false;
    } else {
        //   setInterval(sumirMensagem, 5000);
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
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
            codUnidadeServer: codUnidadeVar,
            cargoServer: cargoVar,
            estadoServer: estadoVar,
            senhaServer: senhaVar,
            dataNascServer: dtNascVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                //   cardErro.style.display = "block";

                //   mensagem_erro.innerHTML =
                //     "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

                setTimeout(() => {
                    alert('Cadastrado');
                    window.location = "login.html";
                }, "2000");

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