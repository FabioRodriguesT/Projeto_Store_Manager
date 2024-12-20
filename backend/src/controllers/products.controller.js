const { productsService } = require('../services');
// importação do map de status, ainda não está criado
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllProducts = async (req, res) => {
  const { status, data } = await productsService.findAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.findById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const createANewProduct = async (req, res) => {
  const { name } = req.body;

  const { status, data } = await productsService.insertAProduct(name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const editAProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { status, data } = await productsService.alterAProduct(name, id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteAProduct = async (req, res) => {
  const { id } = req.params;
  
  const { status, data } = await productsService.deleteAProduct(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const searchProducts = async (req, res) => {
  const searchTerm = req.query.q;

  const { status, data } = await productsService.searchProducts(searchTerm);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllProducts,
  getProductsById,
  createANewProduct,
  editAProduct,
  deleteAProduct,
  searchProducts,
};
