const { salesModel } = require('../models');
const { validationSale } = require('./validation');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (saleId) => {
  const sale = await salesModel.findById(saleId);

  if (!sale || sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  return { status: 'SUCCESSFUL', data: sale };
};

const insertASale = async (sale) => {
  const errors = await validationSale.isValidSale(sale);
  let indexError = 0;
  if (errors.some((error, index) => {
    indexError = index;
    return error !== undefined;
  })) {
    return { status: errors[indexError].status, data: { message: errors[indexError].message },
    };
  }

  const saleId = await salesModel.insertASale(sale);

  const salesArray = await salesModel.findSalesArray(saleId);

  const response = {
    id: saleId,
    itemsSold: salesArray,
  };

  return { status: 'CREATED', data: response };
};

const deleteASale = async (saleId) => {
  const error = await validationSale.hasASale(saleId);
  if (error) {
    return {
      status: error.status,
      data: { message: error.message },
    };
  }

  await salesModel.deleteASale(saleId);

  return { status: 'NO_CONTENT' };
};

const updateQuantity = async (saleId, productId, quantity) => {
  const errors = await validationSale.validateUpdate(saleId, productId, quantity);
  // if (errors) return { status: errors.status, data: { message: errors.message } };

  let indexOfError;
  if (errors.some((error, index) => {
    indexOfError = index;
    return error !== undefined; 
  })) {
    return {
      status: errors[indexOfError].status,
      data: { message: errors[indexOfError].message },
    };
  }
  
  const result = await salesModel.updateQuantity(saleId, productId, quantity);

  return { status: 'SUCCESSFUL', data: result };
};

module.exports = {
  findAll,
  findById,
  insertASale,
  deleteASale,
  updateQuantity,
};