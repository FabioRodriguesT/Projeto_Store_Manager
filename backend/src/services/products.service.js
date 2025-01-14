const { productsModel } = require('../models');
const { validationProduct } = require('./validation');

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
  const error = validationProduct.isValidName(name);
  if (error) return { status: error.status, data: { message: error.message } };

  const newProductId = await productsModel.insertAProduct(name);
  const newProduct = await productsModel.findById(newProductId);
  
  return { status: 'CREATED', data: newProduct };
};

const alterAProduct = async (name, id) => {
  const errors = [
    validationProduct.isValidName(name),
    await validationProduct.isValidProductId(id),
  ];

  let indexOfError; 
  if (errors.some((error, index) => {
    indexOfError = index;
    return error !== undefined; 
  })) {
    return { 
      status: errors[indexOfError].status, data: { message: errors[indexOfError].message } };
  }
   
  const product = await productsModel.alterAProduct(name, id);

  return { status: 'SUCCESSFUL', data: product };
};

const deleteAProduct = async (id) => {
  const error = await validationProduct.isValidProductId(id);
  if (error) return { status: error.status, data: { message: error.message } };

  await productsModel.deleteAProduct(id);

  return { status: 'NO_CONTENT' };
};

const searchProducts = async (searchTerm) => {
  const result = await productsModel.searchProducts(searchTerm);
  
  return { status: 'SUCCESSFUL', data: result };
};

module.exports = {
  findAll,
  findById,
  insertAProduct,
  alterAProduct,
  deleteAProduct,
  searchProducts,
};