// const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id ASC',
  );

  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );

  return product;
};

const insertAProduct = async (name) => {
  // Esse product provavelmente vai ter o formato de: { name: 'nomedoproduto' }
  // const queryExample = 'INSERT INTO products (name) VALUES (\'ProdutoX\')';
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );  

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insertAProduct,
};