const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaihttp = require('chai-http');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaihttp);

const { 
  productFromModel, 
  productsFromModel, 
  findProductSuccessful,
  findProductSuccessfulByIdOne, 
  findProductUnsuccessfullyById,
  newProductFromDB,
  newProductFromModel,
} = require('../mocks/products.mock');

describe('Realizando testes - PRODUCTS CONTROLLER', function () {
  it('Recuperando a lista de todos os produtos com sucesso.', async function () {
    // realizar o teste
    sinon.stub(productsService, 'findAll').resolves(findProductSuccessful);
    const req = {};   

    const res = {
      status: sinon.stub().returnsThis(), 
      json: sinon.stub(),
    };

    await productsController.getAllProducts(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel); 
  });

  it('Recuperando a lista de um único produto com o id especifico, existente no banco de dados.', async function () {
    sinon.stub(productsService, 'findById').resolves(findProductSuccessfulByIdOne);

    const req = { 
      params: { 
        id: '1', 
      }, 
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // const producsinonChait = await productsService.findById(input);
    await productsController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.deep.calledWith(productFromModel);
  });

  it('Recuperando a lista de um único produto com o id especifico, de um id inexistente no banco de dados.', async function () {
    sinon.stub(productsService, 'findById').resolves(findProductUnsuccessfullyById);
    
    const req = { 
      params: { 
        id: '4', 
      }, 
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.getProductsById(req, res);
   
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.deep.calledWith({ message: 'Product not found' });
  });

  it('Recuperando o resultado da função de cadastrar um novo produto.', async function () {
    sinon.stub(productsService, 'insertAProduct').resolves(
      { status: 'CREATED', data: newProductFromDB },
    );

    const req = {
      body: {
        name: 'ProdutoX',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.createANewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.deep.calledWith(newProductFromModel);
  });
  
  it('Recuperando o resultado da função de editar um produto com sucesso.', async function () {
    const mockResult = {
      status: 'SUCCESSFUL',
      data: {
        id: 1,
        name: 'Martelo do Batman',
      },
    };
    
    sinon.stub(productsService, 'alterAProduct').resolves(mockResult);
    
    const req = {
      params: {
        id: 1,
      },
      body: {
        name: 'Martelo do Batman',
      },      
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.editAProduct(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.deep.calledWith(mockResult.data);
  });

  it('Testando o status de error 500 de uma requisição.', async function () {
    sinon.stub(productsService, 'findAll').resolves({
      status: 'SUCCESSFUL2',
      data: {},
    });

    const req = {};

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProducts(req, res);
  
    expect(res.status).to.have.been.calledWith(500);
  });

  afterEach(function () {
    sinon.restore();
  });
});
