document.addEventListener("DOMContentLoaded", () => {
    const perfis = document.querySelectorAll(".perfi-conexao");
    const containerGerenciamento = document.getElementById("container-gerenciar");

    perfis.forEach(perfil => {
        perfil.addEventListener("click", () => {
            const id = perfil.getAttribute("data-id");

            containerGerenciamento.classList.add("ativo");
        })
    })
})