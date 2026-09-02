$('#dashboard.html').on('submit', function(e) {
    e.preventDefault();

    var emailDigitado = $('#email').val().trim();
    var posicaoArroba = emailDigitado.indexOf('@');
    var nomeExtraido = emailDigitado.subtring(0, posicaoArroba);
    var nomeFormatado = nomeExtraido.charAt(0).toUpperCase() + nomeExtraido.slice(1);

    var usuario = {
        nome: nomeFormatado,
        email: emailDigitado
    };

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    window.location.href = "dashboard.html";
});