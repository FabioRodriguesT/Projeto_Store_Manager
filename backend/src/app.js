const express = require('express');
const { productsService } = require('./services');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', async (req, res) => {
  const serviceResponse = await productsService.findAll();
  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(422).json(serviceResponse.data);
  }
  return res.status(201).json(serviceResponse.data);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({ status: `Retorno dos produtos de id: ${id}` });
});

module.exports = app;
