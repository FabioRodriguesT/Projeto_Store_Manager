## Descrição

<strong>Store Manager</strong> é uma API projetada para gerenciamento de vendas. Permitindo que os usuários realizem operações básicas, como ler, deletar e atualizar produtos no seu estoque. Os usuários também pode enviar vendas para o sistema. Essas vendas devem validar se o produto em questão existe. Também é possível ler, deletar e atualizar as vendas.

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


<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
