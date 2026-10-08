# 🐞 Relatório de Defeitos — ModaFácil

Esta documentação reúne defeitos identificados durante a execução de testes no projeto académico **ModaFácil**.

---

## BUG-001 — Cadastro duplicado de produto

**Módulo:** Produtos  
**Tipo:** Regra de negócio / Validação  
**Severidade:** Média  
**Prioridade:** Média  
**Status:** 🔴 Aberto

### 🎯 Descrição
O sistema permite cadastrar novamente um produto que já existe com os mesmos dados, criando um novo registro no banco de dados em vez de atualizar o estoque do produto existente.

### 🧪 Passos para reproduzir
1. Aceder ao módulo **Produtos**.
2. Cadastrar o produto **blusa linho** com quantidade 10.
3. Repetir o cadastro com os mesmos dados.
4. Consultar a listagem de produtos.
5. Consultar a tabela `produtos` no banco de dados.

### ✅ Resultado esperado
Ao identificar um produto já existente, o sistema deve atualizar a quantidade em estoque.

Exemplo:

**10 unidades existentes + 10 novas unidades = 20 unidades em estoque.**

### ❌ Resultado obtido
O sistema criou dois registros distintos para **blusa linho**, ambos com quantidade 10.

A consulta SQL confirmou registros com IDs diferentes:

- ID 6 — quantidade 10
- ID 8 — quantidade 10

### 🗄️ Validação SQL

```sql
SELECT *
FROM produtos
WHERE nome = 'blusa linho';
