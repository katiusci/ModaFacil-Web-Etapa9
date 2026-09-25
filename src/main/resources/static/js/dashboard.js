const usuarioLogado = localStorage.getItem("usuarioLogado");

if (usuarioLogado !== "true") {
    window.location.href = "index.html";
}

const totalProdutos = document.getElementById("totalProdutos");
const totalClientes = document.getElementById("totalClientes");
const totalEstoque = document.getElementById("totalEstoque");
const botaoSair = document.getElementById("botaoSair");

/* Busca os produtos e clientes no banco de dados */

async function carregarDashboard() {
    try {
        const [respostaProdutos, respostaClientes] = await Promise.all([
            fetch("/api/produtos"),
            fetch("/api/clientes")
        ]);

        if (!respostaProdutos.ok || !respostaClientes.ok) {
            throw new Error("Não foi possível carregar os dados.");
        }

        const produtos = await respostaProdutos.json();
        const clientes = await respostaClientes.json();

        const quantidadeEmEstoque = produtos.reduce(
            function (total, produto) {
                return total + Number(produto.quantidade || 0);
            },
            0
        );

        totalProdutos.textContent = produtos.length;
        totalClientes.textContent = clientes.length;
        totalEstoque.textContent = quantidadeEmEstoque;
    } catch (erro) {
        console.error("Erro ao carregar o dashboard:", erro);

        totalProdutos.textContent = "0";
        totalClientes.textContent = "0";
        totalEstoque.textContent = "0";
    }
}

/* Saída do sistema */

botaoSair.addEventListener("click", function () {
    const confirmarSaida = confirm(
        "Deseja realmente sair do sistema?"
    );

    if (confirmarSaida) {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "index.html";
    }
});

carregarDashboard();