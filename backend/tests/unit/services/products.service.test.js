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

  it('Atualizando um produto, alterando o seu nome com sucesso.', async function () {
    sinon.stub(productsModel, 'alterAProduct').resolves({
      id: 1,
      name: 'Martelo de Batman',
    });
    sinon.stub(productsModel, 'findById').resolves({
      id: 1,
      name: 'Martelo de Batman',
    });

    const name = 'Martelo de Batman';
    const id = 1;
   
    const response = await productsService.alterAProduct(name, id);

    expect(response.status).to.equal('SUCCESSFUL');
    expect(response.data).to.deep.equal({
      id: 1,
      name: 'Martelo de Batman',
    });
  });

  it('Atualizando um produto, alterando o seu nome para um nome inválido.', async function () {
    sinon.stub(productsModel, 'alterAProduct').resolves();
    sinon.stub(productsModel, 'findById').resolves();
    
    const name = 'pera'; // nome inválido porquem tem menos que 5 caracteres,
    const id = 1;

    const response = await productsService.alterAProduct(name, id);
    
    expect(response.status).to.be.equal('INVALID_VALUE');
    expect(response.data).to.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });

  it('Testando a função delete um produto, com sucesso.', async function () {
    sinon.stub(productsModel, 'deleteAProduct').resolves();
    sinon.stub(validationProduct, 'isValidProductId').resolves();
    const id = 1;
    
    const response = await productsService.deleteAProduct(id);
  
    expect(response.status).to.equal('NO_CONTENT');
  });

  it('Testando a função delete um produto, com um id inexistente.', async function () {
    sinon.stub(productsModel, 'deleteAProduct').resolves();
    sinon.stub(validationProduct, 'isValidProductId').resolves(
      {
        status: 'BAD_REQUEST',
        message: '"productId" is required',
      },
    );
    const id = 1;
    
    const response = await productsService.deleteAProduct(id);
  
    expect(response.status).to.equal('BAD_REQUEST');
    expect(response.data).to.deep.equal({ message: '"productId" is required' });
  });

  afterEach(function () {
    sinon.restore();
  });
});