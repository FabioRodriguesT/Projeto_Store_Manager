const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const {
  salesFromDB,
  salesFromModel,
  newSaleArrayFromDB,
  newSaleIdFromModel,
  newSaleArrayFromModel,
  newSaleIdFromDB,
} = require('../mocks/sales.mock');
const { validationSale } = require('../../../src/services/validation');

describe('Realizando teste - SALES SERVICES', function () {
  it('Testando a função de listar todas as vendas com sucesso.', async function () {
    sinon.stub(salesModel, 'findAll').resolves(salesFromDB);

    const sales = await salesService.findAll();

    expect(sales.status).equal('SUCCESSFUL');
    expect(sales.data).to.be.deep.equal(salesFromModel);
  });

  it('Testando a função de listar uma única venda com o id específico, exiestene no banco de dados.', async function () {
    sinon.stub(salesModel, 'findById').resolves(salesFromDB);

    const input = '1';
    const sale = await salesService.findById(input);

    expect(sale.status).equal('SUCCESSFUL');
    expect(sale.data).to.be.deep.equal(salesFromModel);
  });

  it('Testando a função de listar uma única venda com id específico, de um id inexistente no banco de dados.', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);

    const input = '3';

    const sale = await salesService.findById(input);

    expect(sale.data).to.be.deep.equal(
      { message: 'Sale not found' },
    );
  });

  it('Testando a função de cadastrar uma nova venda com sucesso.', async function () {
    sinon.stub(salesModel, 'insertASale').resolves(newSaleIdFromModel);
    sinon.stub(salesModel, 'findSalesArray').resolves(newSaleArrayFromDB);
    sinon.stub(productsModel, 'findById').resolves(newSaleIdFromDB);

    const sale = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const reponseNewSaleService = await salesService.insertASale(sale);

    const responseMock = {
      id: newSaleIdFromModel,
      itemsSold: newSaleArrayFromModel,
    };

    expect(reponseNewSaleService.status).to.equal('CREATED');
    expect(reponseNewSaleService.data).to.deep.equal(responseMock);
  });

  it('Testando a função de cadastrar quando o product Id, não é passado no corpo da requisição.', async function () {
    const productId = undefined;

    const response = await validationSale.isValidProductId(productId); 

    expect(response.status).to.equal('BAD_REQUEST');
    expect(response.message).to.deep.equal('"productId" is required');
  });

  it('Testando a função de cadastrar quando o productId, é de um produto não cadastrado, ou não existe no banco de dados.', async function () {
    sinon.stub(productsModel, 'findById').resolves();
    const sale = [{
      productId: 4,
      quantity: 3,
    }];

    const response = await validationSale.isValidSale(sale);    
    
    expect(response[0].status).to.equal('NOT_FOUND');
    expect(response[0].message).to.deep.equal('Product not found');
  });

  it('Testando a função de cadastrar quando o quantity, não é passado no corpo da requisição.', async function () {
    const quantity = undefined;

    const response = await validationSale.isValidQuantity(quantity);    
    
    expect(response.status).to.equal('BAD_REQUEST');
    expect(response.message).to.deep.equal('"quantity" is required');
  }); 

  it('Testando a função de cadastrar quando o quantity, é de valor menor que 0', async function () {
    const quantity = -2;

    const response = await validationSale.isValidQuantity(quantity);    
    expect(response.status).to.equal('INVALID_VALUE');
    expect(response.message).to.deep.equal('"quantity" must be greater than or equal to 1');
  }); 

  it('Testando o erro de cadastrar uma venda, com vários produtos.', async function () {
    sinon.stub(productsModel, 'findById')
      .onFirstCall()
      .resolves({
        id: 1,
        name: 'Martelo de Thor',
      })
      .onSecondCall()
      .resolves();

    const sale = [{
      productId: 1,
      quantity: 2,
    }, {
      productId: 4,
      quantity: 3,
    }];

    const response = await salesService.insertASale(sale);

    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data.message).to.deep.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  }); 
});