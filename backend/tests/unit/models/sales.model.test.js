const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const {
  salesFromDB,
  salesFromModel,
  salesIdFromDB,
  salesIdFromModel,
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

  afterEach(function () {
    sinon.restore();
  });
});