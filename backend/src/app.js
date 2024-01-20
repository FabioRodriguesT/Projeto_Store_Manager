const express = require('express');
// const { productsService } = require('./services');
const { productsRoute } = require('./routes');

const app = express();
app.use(productsRoute);
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productsRoute);

// app.get('/products', async (req, res) => {
//   const serviceResponse = await productsService.findAll();
//   if (serviceResponse.status !== 'SUCCESSFUL') {
//     return res.status(404).json(serviceResponse.data);
//   }  

//   return res.status(200).json(serviceResponse.data);
// });

// app.get('/products/:id', async (req, res) => {
//   const { id } = req.params;
//   const serviceResponse = await productsService.findById(id);
//   if (serviceResponse.status !== 'SUCCESSFUL') {
//     return res.status(404).json(serviceResponse.data);
//   }
//   return res.status(200).json(serviceResponse.data);
// });

module.exports = app;
