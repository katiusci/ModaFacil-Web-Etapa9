
# ModaFácil Web — Etapa 9

[![CI - Testes Java](https://github.com/katiusci/ModaFacil-Web-Etapa9/actions/workflows/ci.yml/badge.svg)](https://github.com/katiusci/ModaFacil-Web-Etapa9/actions/workflows/ci.yml)

Projeto Integrador desenvolvido no curso Técnico em Desenvolvimento de Sistemas do SENAC.

O ModaFácil é um sistema web para gerenciamento de clientes, produtos e estoque de uma loja de roupas. Nesta etapa, o front-end foi integrado a uma API REST desenvolvida com Java e Spring Boot, utilizando MySQL para persistência dos dados.

## Funcionalidades

- Login no sistema;
- Cadastro, consulta, edição e exclusão de clientes;
- Cadastro, consulta, edição e exclusão de produtos;
- Pesquisa de clientes e produtos;
- Controle da quantidade de produtos em estoque;
- Dashboard com totais atualizados pelo banco de dados;
- Formatação de valores em Real brasileiro;
- Validações de formulários;
- API REST integrada ao front-end;
- Persistência dos dados no MySQL.

## Tecnologias utilizadas

- Java 17;
- Spring Boot;
- Spring Web MVC;
- Spring Data JPA;
- Hibernate;
- MySQL;
- Maven;
- JUnit 5;
- HTML5;
- CSS3;
- JavaScript;
- Postman;
- Git e GitHub;
- GitHub Actions.

## Endpoints da API

### Clientes

- `GET /api/clientes`
- `POST /api/clientes`
- `PUT /api/clientes/{id}`
- `DELETE /api/clientes/{id}`

### Produtos

- `GET /api/produtos`
- `POST /api/produtos`
- `PUT /api/produtos/{id}`
- `DELETE /api/produtos/{id}`

## Testes

Foram implementados testes unitários com JUnit para validar a regra de cálculo da quantidade total de produtos em estoque.

Cenários testados:

- Soma das quantidades dos produtos;
- Lista de produtos vazia;
- Lista de produtos nula;
- Inicialização do contexto Spring.

Resultado da execução local:

- 4 testes executados;
- 0 falhas;
- 0 erros;
- Build concluído com sucesso.

## Integração contínua

O projeto utiliza GitHub Actions para executar automaticamente os testes JUnit a cada alteração enviada para a branch `main` e a cada pull request.

O estado atual do CI pode ser consultado pelo selo apresentado no início deste README.

## Bugtracking

As falhas encontradas durante os testes foram registradas no GitHub Issues.

Foi identificado um defeito em que o dashboard apresentava valores incorretos porque utilizava dados do `localStorage`. O problema foi corrigido por meio da integração com as APIs de clientes e produtos. Após a correção, foi realizado o reteste e a Issue foi encerrada.

## Segurança

As credenciais do banco de dados não são armazenadas diretamente no código. O projeto utiliza as variáveis de ambiente:

- `DB_USERNAME`
- `DB_PASSWORD`

## Como executar o projeto

### Pré-requisitos

- Java 17 ou superior;
- Maven;
- MySQL;
- Banco de dados chamado `modafacil_web`.

Configure as variáveis de ambiente com o utilizador e a senha do seu MySQL.

No Windows:

```cmd
setx DB_USERNAME "seu_usuario"
setx DB_PASSWORD "sua_senha"
```

Depois, execute o projeto e acesse:

```text
http://localhost:8080/index.html
```

## Estrutura do projeto

- `controller`: endpoints da API REST;
- `model`: entidades JPA;
- `repository`: acesso aos dados;
- `service`: regras de negócio;
- `static`: páginas HTML, CSS, JavaScript e wireframes;
- `test`: testes automatizados com JUnit.

## Autora

Katiuscia Balbino Coco  
Projeto Integrador — Técnico em Desenvolvimento de Sistemas — SENAC
