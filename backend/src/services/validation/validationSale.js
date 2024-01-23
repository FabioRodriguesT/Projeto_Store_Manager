const { salesModel } = require('../../models');
const validationProduct = require('./validationProduct');

const isValidQuantity = (quantity) => {
  if (quantity === undefined) {
    return {
      status: 'BAD_REQUEST',
      message: '"quantity" is required',
    };
  }

  if (quantity <= 0) {
    return {
      status: 'INVALID_VALUE',
      message: '"quantity" must be greater than or equal to 1',
    };
  }
};

const isValidSale = async (sale) => {
  // formato de entrada da sale
  // [{ "productId": 1, "quantity": 1 }, { "productId": 2, "quantity": 5 }]
  let errorArray = [];
  errorArray = await sale.map(async ({ productId, quantity }) => {
    const error = await validationProduct.isValidProductId(productId);

    if (!error) {
      return isValidQuantity(quantity);
    }

    return error;
  });
  
  const errors = await Promise.all(errorArray);

  return errors;
};

const hasASale = async (id) => {
  const sale = await salesModel.findById(id);

  if (sale === undefined || sale.length === 0) {
    return {
      status: 'NOT_FOUND',
      message: 'Sale not found',
    };
  } 
};

module.exports = {
  isValidSale,
  isValidQuantity,
  hasASale,
};