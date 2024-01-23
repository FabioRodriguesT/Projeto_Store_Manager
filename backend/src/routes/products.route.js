const route = require('express').Router();
const express = require('express');
const { productsController } = require('../controllers');

route.use(express.json());

route.get('/products', productsController.getAllProducts);
route.get('/products/search', productsController.searchProducts);
route.get('/products/:id', productsController.getProductsById);
route.post('/products', productsController.createANewProduct);
route.put('/products/:id', productsController.editAProduct);
route.delete('/products/:id', productsController.deleteAProduct);

module.exports = route;