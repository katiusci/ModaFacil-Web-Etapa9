const usuarioLogado = localStorage.getItem("usuarioLogado");

if (usuarioLogado !== "true") {
    window.location.href = "index.html";
}

const API_CLIENTES = "/api/clientes";

const formCliente = document.getElementById("formCliente");
const listaClientes = document.getElementById("listaClientes");
const semClientes = document.getElementById("semClientes");
const mensagemCliente = document.getElementById("mensagemCliente");
const pesquisaCliente = document.getElementById("pesquisaCliente");
const telefoneCliente = document.getElementById("telefoneCliente");
const cepCliente = document.getElementById("cepCliente");
const botaoSair = document.getElementById("botaoSair");
const botaoSalvarCliente =
        document.getElementById("botaoSalvarCliente");
const botaoCancelarEdicao =
        document.getElementById("botaoCancelarEdicao");

let clientes = [];
let clienteEmEdicaoId = null;

/* Buscar clientes no banco */

async function carregarClientes() {
    try {
        const resposta = await fetch(API_CLIENTES);

        if (!resposta.ok) {
            throw new Error("Não foi possível buscar os clientes.");
        }

        clientes = await resposta.json();
        exibirClientes(clientes);
    } catch (erro) {
        mostrarMensagem(
                "Erro ao carregar clientes do banco de dados.",
                "erro"
        );
    }
}

/* Formatação do telefone */

telefoneCliente.addEventListener("input", function () {
    let telefone = telefoneCliente.value.replace(/\D/g, "");

    telefone = telefone.substring(0, 11);

    if (telefone.length > 10) {
        telefone = telefone.replace(
                /(\d{2})(\d{5})(\d{4})/,
                "($1) $2-$3"
        );
    } else if (telefone.length > 6) {
        telefone = telefone.replace(
                /(\d{2})(\d{4})(\d{0,4})/,
                "($1) $2-$3"
        );
    } else if (telefone.length > 2) {
        telefone = telefone.replace(
                /(\d{2})(\d{0,5})/,
                "($1) $2"
        );
    }

    telefoneCliente.value = telefone;
});

/* Formatação do CEP */

cepCliente.addEventListener("input", function () {
    let cep = cepCliente.value.replace(/\D/g, "");

    cep = cep.substring(0, 8);

    if (cep.length > 5) {
        cep = cep.replace(/(\d{5})(\d{0,3})/, "$1-$2");
    }

    cepCliente.value = cep;
});

/* Cadastro e atualização */

formCliente.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome =
            document.getElementById("nomeCliente").value.trim();

    const email = document
            .getElementById("emailCliente")
            .value.trim()
            .toLowerCase();

    const telefone = telefoneCliente.value.trim();
    const cep = cepCliente.value.trim();
    const estado =
            document.getElementById("estadoCliente").value;
    const cidade =
            document.getElementById("cidadeCliente").value.trim();
    const bairro =
            document.getElementById("bairroCliente").value.trim();
    const rua =
            document.getElementById("ruaCliente").value.trim();
    const numero =
            document.getElementById("numeroCliente").value.trim();

    const complemento = document
            .getElementById("complementoCliente")
            .value.trim();

    const numerosTelefone = telefone.replace(/\D/g, "");
    const numerosCep = cep.replace(/\D/g, "");

    if (nome.length < 3) {
        mostrarMensagem(
                "O nome deve possuir pelo menos 3 caracteres.",
                "erro"
        );
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        mostrarMensagem("Digite um e-mail válido.", "erro");
        return;
    }

    const emailJaCadastrado = clientes.some(function (cliente) {
        return (
                cliente.email === email &&
                cliente.id !== clienteEmEdicaoId
        );
    });

    if (emailJaCadastrado) {
        mostrarMensagem(
                "Este e-mail já está cadastrado.",
                "erro"
        );
        return;
    }

    if (numerosTelefone.length < 10) {
        mostrarMensagem(
                "Digite um telefone com DDD válido.",
                "erro"
        );
        return;
    }

    if (numerosCep.length !== 8) {
        mostrarMensagem(
                "Digite um CEP válido com 8 números.",
                "erro"
        );
        return;
    }

    if (estado === "") {
        mostrarMensagem("Selecione o estado.", "erro");
        return;
    }

    if (cidade.length < 2) {
        mostrarMensagem("Digite uma cidade válida.", "erro");
        return;
    }

    if (bairro.length < 2) {
        mostrarMensagem("Digite um bairro válido.", "erro");
        return;
    }

    if (rua.length < 3) {
        mostrarMensagem("Digite uma rua válida.", "erro");
        return;
    }

    if (numero === "") {
        mostrarMensagem(
                "Digite o número do endereço.",
                "erro"
        );
        return;
    }

    const dadosCliente = {
        nome: nome,
        email: email,
        telefone: telefone,
        cep: cep,
        estado: estado,
        cidade: cidade,
        bairro: bairro,
        rua: rua,
        numero: numero,
        complemento: complemento
    };

    let url = API_CLIENTES;
    let metodo = "POST";
    let mensagemSucesso = "Cliente cadastrado com sucesso!";

    if (clienteEmEdicaoId !== null) {
        url = `${API_CLIENTES}/${clienteEmEdicaoId}`;
        metodo = "PUT";
        mensagemSucesso = "Cliente atualizado com sucesso!";
    }

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosCliente)
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível salvar o cliente.");
        }

        limparModoEdicao();
        await carregarClientes();
        mostrarMensagem(mensagemSucesso, "sucesso");
    } catch (erro) {
        mostrarMensagem(
                "Erro ao salvar o cliente no banco de dados.",
                "erro"
        );
    }
});

/* Exibição */

function exibirClientes(clientesExibidos) {
    listaClientes.innerHTML = "";

    if (clientesExibidos.length === 0) {
        semClientes.style.display = "block";
        return;
    }

    semClientes.style.display = "none";

    clientesExibidos.forEach(function (cliente) {
        const linha = document.createElement("tr");

        criarColuna(linha, cliente.nome);
        criarColuna(linha, cliente.email);
        criarColuna(linha, cliente.telefone);
        criarColuna(linha, montarEndereco(cliente));

        const colunaAcao = document.createElement("td");

        const botaoEditar = document.createElement("button");
        botaoEditar.type = "button";
        botaoEditar.textContent = "Editar";
        botaoEditar.className = "botao-editar";

        botaoEditar.addEventListener("click", function () {
            editarCliente(cliente.id);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "botao-excluir";

        botaoExcluir.addEventListener("click", function () {
            excluirCliente(cliente.id);
        });

        colunaAcao.appendChild(botaoEditar);
        colunaAcao.appendChild(botaoExcluir);
        linha.appendChild(colunaAcao);

        listaClientes.appendChild(linha);
    });
}

function criarColuna(linha, texto) {
    const coluna = document.createElement("td");
    coluna.textContent = texto;
    linha.appendChild(coluna);
}

function montarEndereco(cliente) {
    if (!cliente.rua) {
        return cliente.cidade || "Endereço não informado";
    }

    let endereco =
            cliente.rua +
            ", " +
            cliente.numero +
            " - " +
            cliente.bairro +
            ", " +
            cliente.cidade +
            "/" +
            cliente.estado +
            " - CEP " +
            cliente.cep;

    if (cliente.complemento) {
        endereco += " - " + cliente.complemento;
    }

    return endereco;
}

/* Edição */

function editarCliente(id) {
    const cliente = clientes.find(function (item) {
        return item.id === id;
    });

    if (!cliente) {
        return;
    }

    document.getElementById("nomeCliente").value =
            cliente.nome || "";

    document.getElementById("emailCliente").value =
            cliente.email || "";

    telefoneCliente.value = cliente.telefone || "";
    cepCliente.value = cliente.cep || "";

    document.getElementById("estadoCliente").value =
            cliente.estado || "";

    document.getElementById("cidadeCliente").value =
            cliente.cidade || "";

    document.getElementById("bairroCliente").value =
            cliente.bairro || "";

    document.getElementById("ruaCliente").value =
            cliente.rua || "";

    document.getElementById("numeroCliente").value =
            cliente.numero || "";

    document.getElementById("complementoCliente").value =
            cliente.complemento || "";

    clienteEmEdicaoId = cliente.id;
    botaoSalvarCliente.textContent = "Salvar alterações";
    botaoCancelarEdicao.hidden = false;

    mostrarMensagem(
            "Altere os dados e clique em Salvar alterações.",
            "sucesso"
    );

    document.querySelector(".formulario-card").scrollIntoView({
        behavior: "smooth"
    });
}

function limparModoEdicao() {
    clienteEmEdicaoId = null;
    formCliente.reset();
    botaoSalvarCliente.textContent = "Cadastrar cliente";
    botaoCancelarEdicao.hidden = true;
}

botaoCancelarEdicao.addEventListener("click", function () {
    limparModoEdicao();
    mensagemCliente.textContent = "";
});

/* Exclusão */

async function excluirCliente(id) {
    const confirmarExclusao = confirm(
            "Deseja realmente excluir este cliente?"
    );

    if (!confirmarExclusao) {
        return;
    }

    try {
        const resposta = await fetch(`${API_CLIENTES}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível excluir o cliente.");
        }

        limparModoEdicao();
        await carregarClientes();

        mostrarMensagem(
                "Cliente excluído com sucesso!",
                "sucesso"
        );
    } catch (erro) {
        mostrarMensagem(
                "Erro ao excluir o cliente do banco de dados.",
                "erro"
        );
    }
}

function mostrarMensagem(texto, tipo) {
    mensagemCliente.textContent = texto;

    if (tipo === "sucesso") {
        mensagemCliente.style.color = "#18864b";
    } else {
        mensagemCliente.style.color = "#c62828";
    }
}

/* Pesquisa */

pesquisaCliente.addEventListener("input", function () {
    const pesquisa = pesquisaCliente.value.toLowerCase().trim();

    const clientesFiltrados = clientes.filter(function (cliente) {
        const endereco = montarEndereco(cliente).toLowerCase();

        return (
                cliente.nome.toLowerCase().includes(pesquisa) ||
                cliente.email.toLowerCase().includes(pesquisa) ||
                endereco.includes(pesquisa)
        );
    });

    exibirClientes(clientesFiltrados);
});

/* Saída */

botaoSair.addEventListener("click", function () {
    const confirmarSaida = confirm(
            "Deseja realmente sair do sistema?"
    );

    if (confirmarSaida) {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "index.html";
    }
});

/* Carregamento inicial */

carregarClientes();