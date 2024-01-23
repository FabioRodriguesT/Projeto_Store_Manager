const route = require('express').Router();
const express = require('express');

const { salesController } = require('../controllers');

route.use(express.json());

route.get('/sales', salesController.getAllSales);
route.get(
  '/sales/:id',
  salesController.getSalesById,
);
route.put('/sales/:saleId/products/:productId/quantity', salesController.updateQuantity);
route.post('/sales', salesController.createANewSale);
route.delete('/sales/:id', salesController.deleteASale);

module.exports = route;
