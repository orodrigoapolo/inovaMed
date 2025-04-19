function publicar() {
    // Se houver erros, exibe um alerta
    if (!username.value || !email.value || !mensagem.value) {
        alert('Erro ao publicar: \n' + mensagensErro.join('\n'));
    } else {
        var emailVar = document.getElementById('email').value;
        var nomeVar = document.getElementById('username').value;
        var mensagemVar = document.getElementById('mensagem').value;

        fetch("/faleConosco/publicar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailServer: emailVar,
                nomeServer: nomeVar,
                mensagemServer: mensagemVar,
            }),
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    setTimeout(() => {
                        alert('Mensagem enviada com sucesso!');
                        window.location = "contato.html";
                    }, 2000);
                } else {
                    throw "Houve um erro ao tentar enviar a mensagem!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    }
}