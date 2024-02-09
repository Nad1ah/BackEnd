const express = require('express');
const bodyParser = require('body-parser');
const productsHandlers = require("./products/handlers");
const productsServices = require('./products/services');
const { errorHandler } = require("../middlewares/errorHandler");
const productsRouter = require("./products");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.json());
app.use("/products", productsRouter);
app.use(errorHandler);

app.get('/products/:id', productsServices.getProductById);
app.post('/products', productsHandlers.createProduct);
app.delete('/products/:id', productsHandlers.deleteProduct);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});





module.exports = app;