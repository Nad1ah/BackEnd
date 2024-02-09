const express = require('express');
const bodyParser = require('body-parser');
const productsHandlers = require("./handlers");
const productsServices = require('./services');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/products/:id', productsServices.getProductById);
app.post('/products', productsHandlers.createProduct);
app.delete('/products/:id', productsHandlers.deleteProduct);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});