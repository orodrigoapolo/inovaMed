function publicar() {
    var nomeVar = username.value;
    var emailVar = email.value;
    var msgVar = mensagem.value;

    // Se houver erros, exibe um alerta
    if (!nomeVar.value || !emailVar.value || !msgVar.value) {
        alert('Erro ao publicar, preencha todos os campos');
    } else {

        // Enviando o valor da nova input
        fetch("/contato/publicar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                nomeServer: nomeVar,
                emailServer: emailVar,
                msgServer: msgVar
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {

                    setTimeout(() => {
                        alert('Mensagem Enviada!');
                    }, "1000");

                } else {
                    throw "Houve um erro ao tentar realizar o envio da mensagem!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                // finalizarAguardar();
            });

        return false;
    }
}