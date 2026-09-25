const usuarioLogado = localStorage.getItem("usuarioLogado");

if (usuarioLogado !== "true") {
    window.location.href = "index.html";
}

const API_PRODUTOS = "/api/produtos";

const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const semProdutos = document.getElementById("semProdutos");
const mensagemProduto = document.getElementById("mensagemProduto");
const pesquisaProduto = document.getElementById("pesquisaProduto");
const botaoSair = document.getElementById("botaoSair");
const botaoSalvarProduto =
        document.getElementById("botaoSalvarProduto");
const botaoCancelarEdicaoProduto =
        document.getElementById("botaoCancelarEdicaoProduto");

let produtos = [];
let produtoEmEdicaoId = null;

/* Buscar produtos no banco */

async function carregarProdutos() {
    try {
        const resposta = await fetch(API_PRODUTOS);

        if (!resposta.ok) {
            throw new Error("Não foi possível buscar os produtos.");
        }

        produtos = await resposta.json();
        exibirProdutos(produtos);
    } catch (erro) {
        mostrarMensagem(
                "Erro ao carregar produtos do banco de dados.",
                "erro"
        );
    }
}

/* Cadastro e atualização */

formProduto.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome =
            document.getElementById("nomeProduto").value.trim();
    const categoria =
            document.getElementById("categoria").value;
    const preco =
            Number(document.getElementById("preco").value);
    const quantidade =
            Number(document.getElementById("quantidade").value);

    if (nome.length < 3) {
        mostrarMensagem(
                "O nome do produto deve possuir pelo menos 3 caracteres.",
                "erro"
        );
        return;
    }

    if (categoria === "") {
        mostrarMensagem("Selecione uma categoria.", "erro");
        return;
    }

    if (preco <= 0) {
        mostrarMensagem(
                "O preço deve ser maior que zero.",
                "erro"
        );
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        mostrarMensagem(
                "A quantidade deve ser um número inteiro maior que zero.",
                "erro"
        );
        return;
    }

    const dadosProduto = {
        nome: nome,
        categoria: categoria,
        preco: preco,
        quantidade: quantidade
    };

    let url = API_PRODUTOS;
    let metodo = "POST";
    let mensagemSucesso = "Produto cadastrado com sucesso!";

    if (produtoEmEdicaoId !== null) {
        url = `${API_PRODUTOS}/${produtoEmEdicaoId}`;
        metodo = "PUT";
        mensagemSucesso = "Produto atualizado com sucesso!";
    }

    try {
        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosProduto)
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível salvar o produto.");
        }

        limparModoEdicaoProduto();
        await carregarProdutos();
        mostrarMensagem(mensagemSucesso, "sucesso");
    } catch (erro) {
        mostrarMensagem(
                "Erro ao salvar o produto no banco de dados.",
                "erro"
        );
    }
});

/* Exibição */

function exibirProdutos(produtosExibidos) {
    listaProdutos.innerHTML = "";

    if (produtosExibidos.length === 0) {
        semProdutos.style.display = "block";
        return;
    }

    semProdutos.style.display = "none";

    produtosExibidos.forEach(function (produto) {
        const linha = document.createElement("tr");

        criarColuna(linha, produto.nome);
        criarColuna(linha, produto.categoria);
        criarColuna(linha, formatarPreco(produto.preco));
        criarColuna(linha, produto.quantidade);

        const colunaAcao = document.createElement("td");

        const botaoEditar = document.createElement("button");
        botaoEditar.type = "button";
        botaoEditar.textContent = "Editar";
        botaoEditar.className = "botao-editar";

        botaoEditar.addEventListener("click", function () {
            editarProduto(produto.id);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.type = "button";
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "botao-excluir";

        botaoExcluir.addEventListener("click", function () {
            excluirProduto(produto.id);
        });

        colunaAcao.appendChild(botaoEditar);
        colunaAcao.appendChild(botaoExcluir);
        linha.appendChild(colunaAcao);

        listaProdutos.appendChild(linha);
    });
}

function criarColuna(linha, texto) {
    const coluna = document.createElement("td");
    coluna.textContent = texto;
    linha.appendChild(coluna);
}

/* Edição */

function editarProduto(id) {
    const produto = produtos.find(function (item) {
        return item.id === id;
    });

    if (!produto) {
        return;
    }

    document.getElementById("nomeProduto").value = produto.nome;
    document.getElementById("categoria").value = produto.categoria;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("quantidade").value = produto.quantidade;

    produtoEmEdicaoId = produto.id;
    botaoSalvarProduto.textContent = "Salvar alterações";
    botaoCancelarEdicaoProduto.hidden = false;

    mostrarMensagem(
            "Altere os dados e clique em Salvar alterações.",
            "sucesso"
    );

    document.querySelector(".formulario-card").scrollIntoView({
        behavior: "smooth"
    });
}

function limparModoEdicaoProduto() {
    produtoEmEdicaoId = null;
    formProduto.reset();
    botaoSalvarProduto.textContent = "Cadastrar produto";
    botaoCancelarEdicaoProduto.hidden = true;
}

botaoCancelarEdicaoProduto.addEventListener("click", function () {
    limparModoEdicaoProduto();
    mensagemProduto.textContent = "";
});

/* Exclusão */

async function excluirProduto(id) {
    const confirmarExclusao = confirm(
            "Deseja realmente excluir este produto?"
    );

    if (!confirmarExclusao) {
        return;
    }

    try {
        const resposta = await fetch(`${API_PRODUTOS}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível excluir o produto.");
        }

        limparModoEdicaoProduto();
        await carregarProdutos();

        mostrarMensagem(
                "Produto excluído com sucesso!",
                "sucesso"
        );
    } catch (erro) {
        mostrarMensagem(
                "Erro ao excluir o produto do banco de dados.",
                "erro"
        );
    }
}

function formatarPreco(preco) {
    return Number(preco).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarMensagem(texto, tipo) {
    mensagemProduto.textContent = texto;

    if (tipo === "sucesso") {
        mensagemProduto.style.color = "#18864b";
    } else {
        mensagemProduto.style.color = "#c62828";
    }
}

/* Pesquisa */

pesquisaProduto.addEventListener("input", function () {
    const pesquisa = pesquisaProduto.value.toLowerCase().trim();

    const produtosFiltrados = produtos.filter(function (produto) {
        return (
                produto.nome.toLowerCase().includes(pesquisa) ||
                produto.categoria.toLowerCase().includes(pesquisa)
        );
    });

    exibirProdutos(produtosFiltrados);
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

carregarProdutos();