const { salesService } = require('../services');

const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllSales = async (req, res) => {
  const { status, data } = await salesService.findAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const createANewSale = async (req, res) => {
  const sale = req.body;

  const { status, data } = await salesService.insertASale(sale);

  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteASale = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await salesService.deleteASale(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const updateQuantity = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;

  const { status, data } = await salesService.updateQuantity(saleId, productId, quantity);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllSales,
  getSalesById,
  createANewSale,
  deleteASale,
  updateQuantity,
};