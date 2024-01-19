const { productsModel } = require('../models'); 

const findAll = async () => {
  const products = await productsModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

module.exports = {
  findAll,
};