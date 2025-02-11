## Descrição:

<strong>Store Manager</strong> é uma API projetada para gerenciamento de vendas, permitindo que os usuários realizem operações básicas, como ler, deletar e atualizar produtos no estoque. 
Os usuários também pode enviar vendas no sistema. Essas vendas devem validar se o produto em questão existe. Também é possível ler, deletar e atualizar as vendas.

## Sumário
- [Tecnologias Utilizadas](#Tecnologias-utilizadas)
- [Diagrama de Entidade Relacionamento](#Diagrama-de-Entidade-Relacionamento)
- [Sobre o projeto](#Sobre-o-projeto)
- [Instalação](#Instalação)
- [Testando a Aplicação](#Testando-a-Aplicação)
- [Rostas Disponíveis](#Rotas-disponíveis)
- [Instruções de utilização do projeto](#Instruções-de-utilização-do-projeto)
- [Dependências](#Dependências)
- [Licença](#Licença)

## Tecnologias utilizadas:

- Node.js
- Express
- MySQL

## Diagrama de Entidade Relacionamento:

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

## Sobre o projeto:

### O que foi desenvolvido:

- Foi desenvolvido uma API RESTful utilizando a arquitetura em camadas!
- A API a ser construída é um sistema de gerenciamento de vendas em que será possível criar, visualizar, deletar e atualizar produtos e vendas. O banco de dados MySQL será utilizado para a gestão de dados.
- Também foram desenvolvido testes para garantir a funcionalidade das implementações, uma habilidade essencial para a pessoa desenvolvedora.

### Habilidades desenvolvidas:

- Interagir com um banco de dados relacional MySQL.
- Implementar uma API utilizando arquitetura em camadas.
- Criar validações para os dados recebidos pela API.
- Escrever testes para APIs para garantir a implementação dos endpoints.

## Instalação:

### 🐳 Iniciando a aplicação no Docker Compose

1. Instale as dependências:
```bash
npm install
```

2. Inicie os containers do compose `backend` e `db`. A aplicação estará disponível em `http://localhost:3001` em modo de desenvolvimento:
```bash
docker-compose up -d
```

3. É possível ver os logs da aplicação com `docker logs -n 10 -f <nome-do-container>`:
```bash
docker logs -n 10 -f store_manager
```

### 🖥️ Iniciando a aplicação localmente

⚠️ Atenção: Ao rodar localmente, a aplicação deverá receber variáveis de ambiente, como exemplificado em `env.example`, para poder se comunicar com o serviço de banco de dados.

1. Instale as dependências:
```bash
npm install
```

2. Inicie apenas o serviço `db` no compose:
```bash
docker-compose up -d db
```

3. Inicie a aplicação em modo de desenvolvimento:
```bash
npm run dev:local
```

## Testando a Aplicação:

Antes de rodar os testes do avaliador, garanta que a aplicação esteja executando;
Os testes do avaliador são executados fora do container, na raiz do projeto.

#### Comandos dos testes do avaliador
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
#### Comandos dos testes com mocha

```bash
npm run test:mocha     # roda os testes do mocha
```
```bash
npm run test:coverage  # roda os testes e mostra a cobertura geral
```
```bash
npm run test:mutation  # roda os testes e mostra a cobertura de mutações
```

## Rotas disponíveis:

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
   <th>/products</th>
   <td>Lista todos os produtos</td>
   <th>GET</th>
  </tr>
  <tr>
  <th>/products/:id</th>
   <td>Lista um produto pelo id específico</td>
   <th>GET</th>
  </tr>
  <tr>
   <th>/sales</th>
   <td>Lista todas as vendas</td>
   <th>GET</th>
  </tr>
  <tr>
   <th>/sales/:id</th>
   <td>Lista uma venda pelo id específico</td>
   <th>GET</th>
  </tr>  
  <tr>
   <th>/products</th>
   <td>Cria um novo produto</td>
   <th>POST</th>
  </tr>  
  <tr>
   <th>/sales</th>
   <td>Cria uma nova venda</td>
   <th>POST</th>
  </tr>  
  <tr>
   <th>/products/:id</th>
   <td>Edita/Atualiza um produto com id específico</td>
   <th>PUT</th>
  </tr>
  <tr>
   <th>products/:id</th>
   <td>Deleta um produto com id específico</td>
   <th>DELETE</th>
  </tr>
  <tr>
   <th>/sales/:id</th>
   <td>Deleta uma venda com id específico</td>
   <th>DELETE</th>
  </tr>  
  <tr>
   <th>/sales/:id/products/id/quantity</th>
   <td>Atualiza a quantidade de um produto em uma venda</td>
   <th>PUT</th>
  </tr>
  <tr>
   <th>/products/search?q=productName</th>
   <td>Pesquisa um produto pelo seu nome</td>
   <th>GET</th>
  </tr>  
 </tbody>
</table>

## Instruções de utilização do projeto:

Utilize algum aplicativo ou extensão do VSCode para realizar as requisições.

Exemplo: ThunderClient, Insomnia.

## Dependências:

Este projeto utilizou os seguintes pacotes:
### Dependências:

- @hapi/boom: hapi web framework.
- express: Web framework for Node.js.
- express-async-errors: Middleware to handle async errors.
- joi: Data validation library.
- mysql2: MySQL client for Node.js.

### Dependências de desenvolvimento:

- eslint-config-trybe-backend: ESLint configuration.
- @stryker-mutator/core: Mutation testing.
- @stryker-mutator/mocha-runner: Mutation testing with mocha.
- chai: Assertion library.
- chai-http: HTTP integration testing for Chai.
- mocha: Test framework.
- nodemon: Auto-restart for Node.js applications.
- nyc: Code coverage tool.
- sinon: Standalone test spies, stubs, and mocks.
- sinon-chai: Custom assertions for using the Sinon.

## Licença:

<p>Este projeto é licenciado sob a Licença MIT. Boa codificação!</p>




