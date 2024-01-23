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

const hasProductInASale = async (saleId, findProductId) => {
  const products = await salesModel.findSalesArray(saleId);

  // A lógica é, se algum element.produtoid for igual o produto id eu não retorno nada
  // Agora se nenhum for igual eu jogo um erro
  const hasTheProduct = products.some(
    ({ productId }) => Number(productId) === Number(findProductId),
  );
  
  if (!hasTheProduct) {
    return {
      status: 'NOT_FOUND',
      message: 'Product not found in sale',
    };
  }
};

const validateUpdate = async (saleId, productId, quantity) => {
  const errors = [];

  errors.push(await isValidQuantity(quantity));
  errors.push(await hasASale(saleId));
  errors.push(await hasProductInASale(saleId, productId));

  return errors;
};

module.exports = {
  isValidSale,
  isValidQuantity,
  hasASale,
  validateUpdate,
  hasProductInASale,
};