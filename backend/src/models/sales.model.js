const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT sale_id as saleId, date, product_id as productId, quantity FROM sales_products    
    INNER JOIN sales ON sales_products.sale_id = sales.id 
    ORDER BY sale_id ASC, product_id ASC`,
  );

  return sales;
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id as productId, quantity FROM sales_products 
    INNER JOIN sales ON sales_products.sale_id = sales.id 
    WHERE sales.id = ? 
    ORDER BY product_id ASC`,
    [saleId],
  );

  return sale;
};

const saveSales = async (sales, saleId) => {
  let insertPromises = [];
  if (sales && sales.length > 0) {
    insertPromises = sales.map(({
      productId, quantity }) => connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [saleId, productId, quantity],
    ));
    await Promise.all(insertPromises);
  }
};

const findSalesArray = async (saleId) => {
  const [sales] = await connection.execute(
    `SELECT product_id as productId, quantity FROM sales_products 
    INNER JOIN sales ON sales_products.sale_id = sales.id 
    WHERE sales.id = ? 
    ORDER BY product_id ASC`,
    [saleId],
  );

  return sales;
};

const insertASale = async (sales) => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VAlUES (NOW())');
  await saveSales(sales, insertId);

  return insertId;
};

module.exports = {
  findAll,
  findById,
  insertASale,
  findSalesArray,
};