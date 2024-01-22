const { productsModel } = require('../models');
const validationName = require('./validation/validationName');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (productId) => {
  // product é array contendo os produtos
  const product = await productsModel.findById(productId);
  // retorna messagem Product not found
  if (!product || product.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  return { status: 'SUCCESSFUL', data: product };
};

const insertAProduct = async (name) => {
  const error = validationName.isValidName(name);
  if (error) return { status: error.status, data: { message: error.message } };

  const newProductId = await productsModel.insertAProduct(name);
  const newProduct = await productsModel.findById(newProductId);
  
  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  findAll,
  findById,
  insertAProduct,
};