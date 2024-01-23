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
  newSaleFromDB,
  newSaleFromModel,
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

  it('Recuperando a lista de cadrastar de uma nova venda', async function () {
    sinon.stub(salesService, 'insertASale').resolves(
      { status: 'CREATED', data: newSaleFromDB },
    );

    const req = {
      body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.createANewSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.deep.calledWith(newSaleFromModel);
  });

  it('Testando a função de deleter uma venda com sucesso.', async function () {
    sinon.stub(salesService, 'deleteASale').resolves({
      status: 'NO_CONTENT',
    });

    const req = {
      params: {
        id: 1,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await salesController.deleteASale(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });
   
  afterEach(function () {
    sinon.restore();
  });
});