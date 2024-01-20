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

module.exports = {
  findAll,
  findById,
};