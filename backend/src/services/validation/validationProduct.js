const { productsModel } = require('../../models');

const isValidName = (name) => {
  if (!name) {
    return { 
      status: 'BAD_REQUEST', 
      message: '"name" is required', 
    };
  }

  if (name.length < 5) {
    return { 
      status: 'INVALID_VALUE', 
      message: '"name" length must be at least 5 characters long', 
    };
  }
};

const isValidProductId = async (productId) => {
  if (!productId) {
    return {
      status: 'BAD_REQUEST',
      message: '"productId" is required',
    };
  }

  const findProduct = await productsModel.findById(productId);
  
  if (findProduct === undefined) {
    return {
      status: 'NOT_FOUND',
      message: 'Product not found', 
    };
  }
};

module.exports = {
  isValidName,
  isValidProductId,
};