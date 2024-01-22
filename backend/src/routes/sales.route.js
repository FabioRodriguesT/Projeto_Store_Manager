const route = require('express').Router();
const express = require('express');

const { salesController } = require('../controllers');

route.use(express.json());

route.get('/sales', salesController.getAllSales);

route.get(
  '/sales/:id',
  salesController.getSalesById,
);

route.post('/sales', salesController.createANewSale);

module.exports = route;
