const route = require('express').Router();
const express = require('express');
const { productsController } = require('../controllers');

route.use(express.json());

route.get('/products', productsController.getAllProducts);
route.get('/products/:id', productsController.getProductsById);
route.post('/products', productsController.createANewProduct);
route.put('/products/:id', productsController.editAProduct);
module.exports = route;