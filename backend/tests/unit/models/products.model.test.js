const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { 
  productsFromDB, 
  productsFromModel,
  productFromDB,
  productFromModel,
} = require('../mocks/products.mock');

describe('Realizando teste - PRODUCTS MODEL', function () {
  it('Recuperando a lista de todos os produtos com sucessos', async function () {
    sinon.stub(connection, 'execute').resolves([productsFromDB]);

    const products = await productsModel.findAll();

    expect(products).to.be.an('array');
    expect(products).to.be.deep.equal(productsFromModel);
  });

  it('Realizando teste de lista um único produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);
    // input tem quer ser em formato de string(req.params.id)
    const input = '1';
    
    const product = await productsModel.findById(input);

    expect(product).to.be.a('object');
    expect(product).to.be.deep.equal(productFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
}); 