const productIdFromDB = {
  insertId: 75,  
};
const productIdFromModel = 75;

const newProductFromDB = {
  id: 75,
  name: 'ProdutoX',
};

const newProductFromModel = {
  id: 75,
  name: 'ProdutoX',
};

const productsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },  
];

const productsFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },  
];

const productFromDB = {
  id: 1,
  name: 'Martelo de Thor',
};

const productFromModel = {
  id: 1,
  name: 'Martelo de Thor',
};

const findProductSuccessful = {
  status: 'SUCCESSFUL',
  data: productsFromDB,
};

const findProductSuccessfulByIdOne = {
  status: 'SUCCESSFUL',
  data: productFromDB,
};

const findProductUnsuccessfullyById = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

module.exports = {
  productsFromDB,
  productsFromModel,
  productFromDB,
  productFromModel,
  findProductSuccessful,
  findProductSuccessfulByIdOne,
  findProductUnsuccessfullyById,
  productIdFromDB,
  productIdFromModel,
  newProductFromDB,
  newProductFromModel,
};