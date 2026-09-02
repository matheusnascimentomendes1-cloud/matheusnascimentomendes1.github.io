document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const cpfInput = document.getElementById("cpf");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const confirmarSenhaInput = document.getElementById("confirmar_senha");

    cpfInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        e.target.value = value;
    });

   
    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

  
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, "");
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    form.addEventListener("submit", function (e) {
        const cpfLimpo = cpfInput.value.replace(/\D/g, "");

        if (!validarCPF(cpfLimpo)) {
            e.preventDefault();
            alert("Por favor, insira um CPF válido.");
            cpfInput.focus();
            return;
        }

        if (!validarEmail(emailInput.value)) {
            e.preventDefault();
            alert("Por favor, insira um endereço de e-mail válido.");
            emailInput.focus();
            return;
        }

        if (senhaInput.value !== confirmarSenhaInput.value) {
            e.preventDefault();
            alert("As senhas não coincidem. Verifique e tente novamente.");
            confirmarSenhaInput.focus();
            return;
        }
    });
});