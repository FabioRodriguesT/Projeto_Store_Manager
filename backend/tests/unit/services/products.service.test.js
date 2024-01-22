const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const {
  productFromDB,
  productFromModel,
  productsFromDB,
  productsFromModel,
  productIdFromModel,
  newProductFromDB,
  newProductFromModel,
} = require('../mocks/products.mock');
const { validationProduct } = require('../../../src/services/validation');

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

  it('Testando a funçao de cadastrar um novo produto com sucesso.', async function () {
    sinon.stub(productsModel, 'insertAProduct').resolves(productIdFromModel);
    sinon.stub(productsModel, 'findById').resolves(newProductFromDB);

    const input = 'ProdutoX';   

    const responsiveNewProductService = await productsService.insertAProduct(input);

    expect(responsiveNewProductService.status).to.equal('CREATED');
    expect(responsiveNewProductService.data).to.deep.equal(newProductFromModel);
  });

  it('Testando a validação de nome, sem ter um nome.', async function () {
    const name = undefined;
    const response = validationProduct.isValidName(name);

    expect(response.status).to.equal('BAD_REQUEST');
    expect(response.message).to.deep.equal('"name" is required');
  });

  it('Testando a validação de nome, com um nome menor que 5 caracteres', async function () {
    const name = 'pera';

    const response = await productsService.insertAProduct(name);   

    expect(response.status).to.equal('INVALID_VALUE');
    expect(response.data.message).to.deep.equal('"name" length must be at least 5 characters long');
  });

  afterEach(function () {
    sinon.restore();
  });
});