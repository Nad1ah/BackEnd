// services.js

const { products } = require('./data');

function readProducts() {
  return products;
}

function findProductById(id) {
  return products.find((product) => product.id === id);
}

module.exports = { readProducts, findProductById };