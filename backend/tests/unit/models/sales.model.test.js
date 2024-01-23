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

  it('Realizando a busca do array de produtos de uma venda específica.', async function () {
    sinon.stub(connection, 'execute').resolves([[
      {
        productId: 1,
        quantity: 5,
      },
      {
        productId: 2,
        quantity: 10,
      },
    ]]);
    
    const saledId = 1;
    
    const response = await salesModel.findSalesArray(saledId);
     
    expect(response).to.have.length(2);
  });

  it('Realizando a criação de vendas em um determinada venda.', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([newSaleIdFromDB])
      .onSecondCall()
      .resolves(null);

    const sales = [];

    const response = await salesModel.insertASale(sales);

    expect(response).to.be.a('number');    
  });

  it('Realizando teste na função de deletar uma venda com sucesso.', async function () {
    sinon.stub(connection, 'execute').resolves();
    sinon.spy(salesModel, 'deleteASale');

    const id = 1;
    await salesModel.deleteASale(id);

    sinon.assert.calledWith(salesModel.deleteASale);
  });
  
  it('Realizando teste na função que atualiza a quantidade, com sucesso.', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves()
      .onSecondCall()
      .resolves([[{
        date: '2024-01-23T15:32:23.000Z',
        productId: 2,
        quantity: 15,
        saleId: 1,
      }]]);
    
    const saleId = 1;
    const productId = 2;
    const quantity = 15;
    
    const response = await salesModel.updateQuantity(saleId, productId, quantity);
   
    expect(response).to.be.a('object');
    expect(response).to.be.deep.equal({
      date: '2024-01-23T15:32:23.000Z',
      productId: 2,
      quantity: 15,
      saleId: 1,
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});