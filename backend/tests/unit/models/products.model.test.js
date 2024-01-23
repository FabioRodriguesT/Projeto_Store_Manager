const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { 
  productsFromDB, 
  productsFromModel,
  productFromDB,
  productFromModel,
  productIdFromDB,
  productIdFromModel,
} = require('../mocks/products.mock');

describe('Realizando teste - PRODUCTS MODEL', function () {
  it('Recuperando a lista de todos os produtos com sucesso.', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productsModel.findAll();

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(productsFromModel);
  });

  it('Realizando teste de lista um único produto com sucesso, existente no banco de dados.', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);
    // input tem quer ser em formato de string(req.params.id)
    const input = '1';
    
    const product = await productsModel.findById(input);

    expect(product).to.be.a('object');
    expect(product).to.be.deep.equal(productFromModel);
  });

  it('Realizando teste de cadastrar um novo produto com sucesso.', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([productIdFromDB])
      .onSecondCall()
      .resolves(null);
    const input = 'ProdutoX';

    const newProduct = await productsModel.insertAProduct(input);  

    expect(newProduct).to.be.a('number');
    expect(newProduct).to.equal(productIdFromModel);
  });

  it('Realizando teste de altera um nome de um produto.', async function () {
    sinon.stub(connection, 'execute').resolves([
      [{ id: 1, name: 'Martelo do Batman' }],
    ]);

    const name = 'Martelo do Batman';
    const id = 1;

    const response = await productsModel.alterAProduct(name, id);

    expect(response).to.be.a('object');
    expect(response.id).to.equal(1);
    expect(response.name).to.equal('Martelo do Batman');   
  });

  afterEach(function () {
    sinon.restore();
  });
}); 