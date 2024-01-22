const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const {
  salesFromDB,
  salesFromModel,
  salesIdFromDB,
  salesIdFromModel,
  newSaleIdFromDB,
  newSaleIdFromModel,
} = require('../mocks/sales.mock');

describe('Realizando teste - SALES MODEL', function () {
  it('Recuperando a lista de todos as vendas com sucesso.', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDB]);
    const sales = await salesModel.findAll();

    expect(sales).to.be.an('array');
    expect(sales).to.be.deep.equal(salesFromModel);
  });

  it('Recuperando a lista de uma única venda com sucesso, existente no banco de dados.', async function () {
    sinon.stub(connection, 'execute').resolves([salesIdFromDB]);

    const input = '1';

    const sale = await salesModel.findById(input);

    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal(salesIdFromModel);
  });

  it('Realizando teste de cadastrar uma nova venda com sucesso.', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([newSaleIdFromDB])
      .onSecondCall()
      .resolves(null);

    const sales = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const newSale = await salesModel.insertASale(sales);

    expect(newSale).to.be.a('number');
    expect(newSale).to.equal(newSaleIdFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});