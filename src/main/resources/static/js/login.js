const formLogin = document.getElementById("formLogin");
const mensagemLogin = document.getElementById("mensagemLogin");

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    mensagemLogin.textContent = "";

    if (email === "" || senha === "") {
        mostrarMensagem("Preencha todos os campos.", "erro");
        return;
    }

    if (!email.includes("@")) {
        mostrarMensagem("Digite um e-mail válido.", "erro");
        return;
    }

    if (senha.length < 6) {
        mostrarMensagem(
            "A senha deve possuir pelo menos 6 caracteres.",
            "erro"
        );
        return;
    }

    if (email === "admin@modafacil.com" && senha === "123456") {
        mostrarMensagem("Login realizado com sucesso!", "sucesso");

        localStorage.setItem("usuarioLogado", "true");

        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 1000);
    } else {
        mostrarMensagem("E-mail ou senha incorretos.", "erro");
    }
});

function mostrarMensagem(texto, tipo) {
    mensagemLogin.textContent = texto;

    if (tipo === "sucesso") {
        mensagemLogin.style.color = "#18864b";
    } else {
        mensagemLogin.style.color = "#c62828";
    }
}