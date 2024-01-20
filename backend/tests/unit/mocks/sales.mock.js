const myDate = '2024-01-20T13:09:34.000Z';

const salesFromDB = [
  {
    saleId: 1,
    date: myDate,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: myDate,          
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: myDate,
    productId: 3,
    quantity: 15,
  },  
];

const salesFromModel = [
  {
    saleId: 1,
    date: myDate,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: myDate,          
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: myDate,
    productId: 3,
    quantity: 15,
  },  
];

const salesIdFromDB = [
  {
    date: myDate,
    productId: 1,
    quantity: 5,
  },
  {
    date: myDate,
    productId: 2,
    quantity: 10,
  },
];

const salesIdFromModel = [
  {
    date: myDate,
    productId: 1,
    quantity: 5,
  },
  {
    date: myDate,
    productId: 2,
    quantity: 10,
  },
];

const findSalesSuccessful = {
  status: 'SUCCESSFUL',
  data: salesFromDB,
};

const findSalesSuccessfulById = {
  status: 'SUCCESSFUL',
  data: salesIdFromDB,
};

const findSalesUnsuccessfullyById = {
  status: 'NOT_FOUND',
  data: { message: 'Sale not found' },
};

module.exports = {
  salesFromDB,
  salesFromModel,
  salesIdFromDB,
  salesIdFromModel,
  findSalesSuccessful,
  findSalesSuccessfulById,
  findSalesUnsuccessfullyById,
};