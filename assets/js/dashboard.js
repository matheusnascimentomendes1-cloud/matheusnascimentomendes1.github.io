document.addEventListener("DOMContentLoaded", () => {
  const btnTema = document.getElementById("btnTema");
  if (btnTema) {
    btnTema.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      
      if (document.body.classList.contains("dark-theme")) {
        btnTema.textContent = "Light Mode";
      } else {
        btnTema.textContent = "Dark Mode";
      }
    });
  }

  const campoBusca = document.getElementById("campoBusca");
  const elementosBusca = document.querySelectorAll(".g3 .box, .g4 .box");

  if (campoBusca) {
    campoBusca.addEventListener("input", () => {
      const termoBusca = campoBusca.value.toLowerCase();

      elementosBusca.forEach((item) => {
        const textoItem = item.textContent.toLowerCase();
        if (textoItem.includes(termoBusca)) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  }

  const btnMenuMobile = document.getElementById("btnMenuMobile");
  const sidebar = document.getElementById("sidebar");

  if (btnMenuMobile && sidebar) {
    btnMenuMobile.addEventListener("click", (event) => {
      event.preventDefault();
      sidebar.classList.toggle("oculto");
    });
  }
});