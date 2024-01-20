const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaihttp = require('chai-http');

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaihttp);

const {
  salesFromModel,
  salesIdFromModel,
  findSalesSuccessful,
  findSalesSuccessfulById,
  findSalesUnsuccessfullyById,
} = require('../mocks/sales.mock');

describe('Realizando teste - SALES CONTROLLER', function () {
  it('Recuperando a lista de todas as vendas com sucesso.', async function () {
    sinon.stub(salesService, 'findAll').resolves(findSalesSuccessful);

    const req = {};

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromModel);
  });

  it('Recuperando a lista de uma única venda com o id especifico, existente no banco de dados.', async function () {
    sinon.stub(salesService, 'findById').resolves(findSalesSuccessfulById);
    const req = {
      params: {
        id: '1',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.deep.calledWith(salesIdFromModel);
  });

  it('Recuperando a lista de uma única venda com o id especifico, de um id inexistente no banco de dados.', async function () {
    sinon.stub(salesService, 'findById').resolves(findSalesUnsuccessfullyById);

    const req = {
      params: {
        id: '4',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.deep.calledWith({ message: 'Sale not found' });
  });
   
  afterEach(function () {
    sinon.restore();
  });
});