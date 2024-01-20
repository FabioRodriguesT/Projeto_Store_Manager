const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const {
  productFromDB,
  productFromModel,
  productsFromDB,
  productsFromModel,
} = require('../mocks/products.mock');

describe('Realizando teste - PRODUCTS SERVICES', function () {
  it('Testando a função de listar todos os produtos com sucesso.', async function () {
    sinon.stub(productsModel, 'findAll').resolves(productsFromDB);

    const products = await productsService.findAll();

    expect(products.status).equal('SUCCESSFUL');
    expect(products.data).to.be.deep.equal(productsFromModel);
  });

  it('Testando a função de listar um único produto com o id específico, existente no banco de dados.', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromDB);

    const input = '1';
    const product = await productsService.findById(input);

    expect(product.status).equal('SUCCESSFUL');
    expect(product.data).to.be.deep.equal(productFromModel);
  });

  it('Testando a função de listar um único produto com o id específico, de um id inexistente no banco de dados.', async function () {
    sinon.stub(productsModel, 'findById').resolves([]);

    const input = '4';
    const product = await productsService.findById(input);
   
    expect(product.data).to.be.deep.equal(
      { message: 'Product not found' },
    );
  });

  afterEach(function () {
    sinon.restore();
  });
});