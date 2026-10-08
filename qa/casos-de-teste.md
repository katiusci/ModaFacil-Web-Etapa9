# 🧪 Casos de Teste — ModaFácil

Esta documentação reúne casos de teste executados no projeto académico **ModaFácil**, com foco na aplicação prática de Quality Assurance e Testes Manuais.

---

## CT-001 — Cadastro de cliente com dados válidos

**Módulo:** Clientes  
**Tipo de teste:** Funcional  
**Status:** ✅ Aprovado

### 🎯 Objetivo
Validar se o sistema permite cadastrar corretamente um novo cliente utilizando dados válidos.

### Pré-condição
- Aplicação ModaFácil em execução.
- Acesso ao módulo de Clientes.

### Dados utilizados
- **Nome:** Maria Oliveira
- **E-mail:** maria.oliveira@email.com
- **Estado:** SP
- **Cidade:** São Paulo
- **Bairro:** Centro
- **Rua:** Rua das Flores
- **Número:** 125

### Passos executados
1. Aceder ao módulo **Clientes**.
2. Preencher os campos do formulário com dados válidos.
3. Clicar em **Cadastrar cliente**.
4. Verificar a mensagem apresentada pelo sistema.
5. Confirmar a presença do cliente na listagem.
6. Consultar o banco de dados para validar a persistência do registo.

### Resultado esperado
O cliente deve ser cadastrado com sucesso, apresentado na listagem e os seus dados devem ser persistidos no banco de dados.

### Resultado obtido
O sistema apresentou a mensagem **“Cliente cadastrado com sucesso!”**.

O cliente foi apresentado corretamente na listagem e a consulta SQL confirmou que os dados foram persistidos no banco.

### 🗄️ Validação SQL

```sql
SELECT *
FROM clientes
WHERE nome = 'Maria Oliveira';
```





## CT-002 — Validação de campo obrigatório

**Módulo:** Clientes  
**Tipo:** Teste funcional — Cenário negativo  
**Status:** ✅ Aprovado

### 🎯 Objetivo
Validar se o sistema impede o cadastro quando o campo obrigatório **Nome completo** não é preenchido.

### 🧪 Cenário testado
1. Preencher os dados do cliente.
2. Manter **Nome completo** vazio.
3. Clicar em **Cadastrar cliente**.

### ✅ Resultado esperado
O sistema deve impedir o cadastro e informar que o campo precisa ser preenchido.

### 🔎 Resultado obtido
O cadastro foi bloqueado e o sistema apresentou a mensagem:

> **“Preencha este campo.”**

### 📸 Evidência
Captura da validação apresentada no campo **Nome completo**.

**Resultado final: ✅ APROVADO**
