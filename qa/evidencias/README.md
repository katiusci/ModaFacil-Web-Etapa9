# 📸 Evidências de Testes — ModaFácil

Esta pasta contém as evidências das execuções dos casos de teste documentados no projeto.

## CT-001 — Cadastro de cliente com dados válidos

- Formulário preenchido
- Confirmação de cadastro realizado com sucesso
- Validação da persistência dos dados através de SQL

---

## 📸 Evidências — CT-001

### Evidência 01 — Formulário preenchido

![CT-001 - Formulário preenchido](CT001-01-formulario-preenchido.png)

### Evidência 02 — Cadastro realizado com sucesso

![CT-001 - Cadastro realizado](CT001-02-cadastro-sucesso.png)

### Evidência 03 — Validação no banco de dados

Consulta SQL realizada para confirmar a persistência dos dados cadastrados.

![CT-001 - Validação SQL](CT001-03-validacao-sql%20(2).png)

---

## CT-002 — Validação de campo obrigatório

### Evidência 01 — Nome completo obrigatório

O sistema impediu o cadastro e apresentou a mensagem **“Preencha este campo.”** quando o campo **Nome completo** foi deixado vazio.

![CT-002 - Campo nome obrigatório](CT002-01-campo-nome-obrigatorio.png)

**Resultado: ✅ APROVADO**
