const { productsModel } = require('../models'); 

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

module.exports = {
  findAll,
  findById,
};