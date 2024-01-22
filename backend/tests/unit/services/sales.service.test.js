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

  afterEach(function () {
    sinon.restore();
  });
});