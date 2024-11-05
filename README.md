## Descrição

<strong>Store Manager</strong> é uma API projetada para gerenciamento de vendas. Permitindo que os usuários realizem operações básicas, como ler, deletar e atualizar produtos no seu estoque. Os usuários também pode enviar vendas para o sistema. Essas vendas devem validar se o produto em questão existe. Também é possível ler, deletar e atualizar as vendas.

## Técnologias usadas

- Node.js
- Express
- MySQL

## Diagrama de Entidade-Relacionamento:

Para orientar a construção das tabelas através do ORM, utilize o DER a seguir:

 ![Diagrama de Entidade do Blogs-API](./store_manager_database.png)
 
 <table>
  <thead>
   <tr>
    <th>Tabela</th>
    <th>Formato</th>
    <th>Notas</th>
   </tr>
  </thead>
  <tbody>
   <tr>
    <td>products</td>
    <td>
     <table>
      <thead>
       <tr>
        <th>id</th>
        <th>name</th>
       </tr>
      </thead>
      <tbody>
       <tr>
        <td>1</td>
        <td>Martelo de Thor</td>
       </tr>
       <tr>
        <td>2</td>
        <td>Traje de encolhimento</td>
       </tr>
       <tr>
        <td>3</td>
        <td>Escudo do Capitão América</td>
       </tr>
      </tbody>
     </table>
    </td>
    <td>O id é gerado automaticamente</td>
   </tr>
   <tr>
    <td>sales</td>
    <td>
     <table>
      <thead>
       <tr>
        <th>id</th>
        <th>date</th>
       </tr>
      </thead>
      <tbody>
       <tr>
        <td>1</td>
        <td>2022-05-27 01:59:51</td>
       </tr>
       <tr>
        <td>2</td>
        <td>2022-05-27 01:59:51</td>
       </tr>       
      </tbody>
     </table>
    </td>
    <td>O id e date são gerados automaticamente</td>
   </tr>
   <tr>
    <td>sales_products</td>
    <td>
     <table>
      <thead>
       <tr>
        <th>sale_id</th>
        <th>product_id</th>
        <th>quantity</th>
       </tr>
      </thead>
      <tbody>
       <tr>
        <td>1</td>
        <td>1</td>
        <td>5</td>
       </tr>
       <tr>
        <td>1</td>
        <td>2</td>
        <td>10</td>
       </tr>
       <tr>
        <td>2</td>
        <td>3</td>
        <td>15</td>
       </tr>
      </tbody>
     </table>
    </td>
    <td>Os registros nessa tabela são removidos automaticamente em caso de remoção do produto ou da venda relacionados (ON DELETE CASCADE)</td>
   </tr>
  </tbody>
 </table>

 - Os scripts para criar e popular o banco de dados podem ser vistos no diretório sql;

## O que foi desenvolvido:

- Foi desenvolvido uma API RESTful utilizando a arquitetura em camadas!
- A API a ser construída é um sistema de gerenciamento de vendas em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Você deverá utilizar o banco de dados MySQL para a gestão de dados.
- Também foi desenvolvido testes para garantir as funcionalidade das implementações, uma habilidade essencial para a pessoa desenvolvedora.

## Habilidades a serem trabalhadas:

- Interagir com um banco de dados relacional MySQL.
- Implementar uma API utilizando arquitetura em camadas.
- Criar validações para os dados recebidos pela API.
- Escrever testes para APIs para garantir a implementação dos endpoints.

## Instalação:

### 🐳 Iniciando a aplicação no Docker Compose

1. Instale as dependências
```bash
npm install
```

2. Inicie os containers do compose `backend` e `db`.
A aplicação estará disponível em `http://localhost:3001` em modo de desenvolvimento
```bash
docker-compose up -d
```

3. É possível ver os logs da aplicação com `docker logs -n 10 -f <nome-do-container>`
```bash
docker logs -n 10 -f store_manager
```

### 🖥️ Iniciando a aplicação localmente

⚠️ Atenção: Ao rodar localmente, a aplicação deverá receber variáveis de ambiente como exemplificado em env.example para poder se comunicar com o serviço de banco de dados.

1. Instale as dependências
```bash
npm install
```

2. Inicie apenas o serviço `db` no compose
```bash
docker-compose up -d db
```

3. Inicie a aplicação em modo de desenvolvimento
```bash
npm run dev:local
```


## Testando a Aplicação:

Antes de rodar os testes do avaliador, garanta que a aplicação esteja executando;
Os testes do avaliador são executados fora do container na raiz do projeto.

- ### Comandos dos testes do avaliador
```bash
npm run lint     # roda a verificação do linter
```
```bash
npm test         # roda todos os testes no terminal ou
```
```bash
REQ=01 npm test  # rodando apenas o teste do requisito 01 pelo terminal ou
```
```bash
npm run cy:open  # abre a interface gráfica do Cypress para rodar os testes
```
- ### Comandos dos testes com mocha

```bash
npm run test:mocha     # roda os testes do mocha
```
```bash
npm run test:coverage  # roda os testes e mostra a cobertura geral
```
```bash
npm run test:mutation  # roda os testes e mostra a cobertura de mutações
```

## Rotas disponíveis

<table>
 <thead>
  <tr>
   <th>Rota</th>
   <th>Funcionalidade</th>
   <th>Tipo de Requisição</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td>/products</td>
   <td>Lista todos os produtos</td>
   <td>GET</td>
  </tr>
  <tr>
  <td>/products/:id</td>
   <td>Lista um produto pelo id específico</td>
   <td>GET</td>
  </tr>
  <tr>
   <td>/sales</td>
   <td>Lista todas as vendas</td>
   <td>GET</td>
  </tr>
  <tr>
   <td>/sales/:id</td>
   <td>Lista uma venda pelo id específico</td>
   <td>GET</td>
  </tr>  
  <tr>
   <td>/products</td>
   <td>Cria um novo produto</td>
   <td>POST</td>
  </tr>  
  <tr>
   <td>/sales</td>
   <td>Cria uma nova venda</td>
   <td>POST</td>
  </tr>  
  <tr>
   <td>/products/:id</td>
   <td>Edita/Atualiza um produto com id específico</td>
   <td>PUT</td>
  </tr>
  <tr>
   <td>products/:id</td>
   <td>Deleta um produto com id específico</td>
   <td>DELETE</td>
  </tr>
  <tr>
   <td>/sales/:id</td>
   <td>Deleta uma venda com id específico</td>
   <td>DELETE</td>
  </tr>  
  <tr>
   <td>/sales/:id/products/id/quantity</td>
   <td>Atualiza a quantidade de um produto em uma venda</td>
   <td>PUT</td>
  </tr>
  <tr>
   <td>/products/search?q=productName</td>
   <td>Pesquisa um produto pelo seu nome</td>
   <td>GET</td>
  </tr>  
 </tbody>
</table>

## Utilização:

Utilize algum aplicativo ou extensão do VSCode para realizar as requisições.

Exemplo: ThunderClient, Insomnia, entre outros.

Dependências:

Este projeto utilizou os seguintes pacotes:
Dependências:

    express: Web framework for Node.js.
    express-async-errors: Middleware to handle async errors.
    joi: Data validation library.
    jsonwebtoken: For handling JWT authentication.
    mysql2: MySQL client for Node.js.
    sequelize: ORM for managing SQL databases.

Dependências de desenvolvimento:
chai: Assertion library.
chai-http: HTTP integration testing for Chai.
change-case: Utilities for changing case of strings.
eslint-config-trybe-backend: ESLint configuration.
frisby: API testing framework.
jest: JavaScript testing framework.
mocha: Test framework.
nodemon: Auto-restart for Node.js applications.
nyc: Code coverage tool.
sequelize-cli: CLI for Sequelize.
sinon: Standalone test spies, stubs, and mocks.
supertest: Testing HTTP servers.


<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
