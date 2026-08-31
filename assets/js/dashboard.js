$(document).ready(function () {
    
    var usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    
    if (usuarioLogado) {
        $("#perfil-nome").text(usuarioLogado.nome);
        $("#perfil-email").text(usuarioLogado.email);
    } else {
        window.location.href = "Login.html";
    }

    var btnToggleTheme = document.getElementById("btn-toggle-theme");
    var switchTema = document.getElementById("switch-tema");
    var iconeBotaoTema = document.getElementById("icone-botao-tema");
    var textoBotaoTema = document.getElementById("texto-botao-tema");
    var iconeTemaSubmenu = document.getElementById("icone-tema");

    function aplicarTema(isDark) {
        if (isDark) {
            document.body.classList.add("dark-theme");
            if (switchTema) switchTema.checked = true;
            if (iconeBotaoTema) iconeBotaoTema.className = "bi bi-sun";
            if (textoBotaoTema) textoBotaoTema.textContent = "Modo Claro";
            if (iconeTemaSubmenu) iconeTemaSubmenu.className = "bi bi-sun fs-5";
            localStorage.setItem("temaDashboard", "dark");
        } else {
            document.body.classList.remove("dark-theme");
            if (switchTema) switchTema.checked = false;
            if (iconeBotaoTema) iconeBotaoTema.className = "bi bi-moon-stars";
            if (textoBotaoTema) textoBotaoTema.textContent = "Modo Escuro";
            if (iconeTemaSubmenu) iconeTemaSubmenu.className = "bi bi-moon-stars fs-5";
            localStorage.setItem("temaDashboard", "light");
        }
    }

    var temaSalvo = localStorage.getItem("temaDashboard");
    aplicarTema(temaSalvo === "dark");

    if (btnToggleTheme) {
        btnToggleTheme.addEventListener("click", function () {
            var ehEscuro = document.body.classList.toggle("dark-theme");
            aplicarTema(ehEscuro);
        });
    }

    if (switchTema) {
        switchTema.addEventListener("change", function () {
            aplicarTema(this.checked);
        });
    }

    $("#btn-logout").on("click", function () {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "Login.html";
    });

    var inputPesquisa = document.getElementById("input-pesquisa");
    if (inputPesquisa) {
        inputPesquisa.addEventListener("input", function () {
            var termo = this.value.toLowerCase().trim();
            var elementosMain = document.querySelectorAll(".card-item, #tabelaDispositivos tbody tr");

            elementosMain.forEach(function (el) {
                var textoConteudo = el.textContent.toLowerCase();
                if (textoConteudo.indexOf(termo) !== -1) {
                    el.style.display = "";
                } else {
                    el.style.display = "none";
                }
            });
        });
    }

    $('#ipDispositivo').mask('000.000.000.000', { placeholder: "___.___.___.___" });

    function validarEmail(email) {
        var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    function validarIP(ip) {
        var regexIP = /^(25[0-5]|20[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|20[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|20[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|20[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return regexIP.test(ip);
    }

    $('#formCadastro').on('submit', function (e) {
        e.preventDefault();

        var nome = $('#nomeDispositivo').val().trim();
        var categoria = $('#categoriaDispositivo').val();
        var ip = $('#ipDispositivo').val().trim();
        var email = $('#emailResponsavel').val().trim();
        var status = $('#statusInicial').val();

        var isValid = true;
        $('.form-control, .form-select').removeClass('is-invalid');

        if (!nome) { $('#nomeDispositivo').addClass('is-invalid'); isValid = false; }
        if (!categoria) { $('#categoriaDispositivo').addClass('is-invalid'); isValid = false; }
        if (!validarIP(ip)) { $('#ipDispositivo').addClass('is-invalid'); isValid = false; }
        if (!validarEmail(email)) { $('#emailResponsavel').addClass('is-invalid'); isValid = false; }

        if (isValid) {
            adicionarDispositivoNaTabela(nome, categoria, ip, email, status);
            exibirFeedback('Dispositivo registrado com sucesso!', 'success');
            this.reset();
        } else {
            exibirFeedback('Verifique os campos em vermelho e tente novamente.', 'danger');
        }
    });

    function adicionarDispositivoNaTabela(nome, categoria, ip, email, status) {
        var badgeClass = 'bg-secondary';
        if (status === 'Ativo') badgeClass = 'bg-success';
        if (status === 'Alerta') badgeClass = 'bg-danger';

        var novaLinha = '<tr>' +
            '<td><strong>' + nome + '</strong></td>' +
            '<td>' + categoria + '</td>' +
            '<td><code>' + ip + '</code></td>' +
            '<td>' + email + '</td>' +
            '<td><span class="badge ' + badgeClass + '">' + status + '</span></td>' +
            '<td><button class="btn btn-sm btn-outline-danger btn-deletar"><i class="bi bi-trash"></i></button></td>' +
        '</tr>';

        $('#tabelaDispositivos tbody').append(novaLinha);
    }

    $('#tabelaDispositivos').on('click', '.btn-deletar', function () {
        $(this).closest('tr').fadeOut(300, function () { $(this).remove(); });
    });

    function exibirFeedback(mensagem, tipo) {
        var $alert = $('#alertFeedback');
        $alert.removeClass('d-none alert-success alert-danger').addClass('alert-' + tipo).html(mensagem);
        setTimeout(function () { $alert.addClass('d-none'); }, 4000);
    }
});