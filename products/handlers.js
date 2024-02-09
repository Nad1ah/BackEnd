const Joi = require('joi');
const products = require("./data");

const productSchema = Joi.object({
  id: Joi.number().integer().min(1).max(10),
  name: Joi.string().min(1).max(50).required(),
  size: Joi.string().min(1).max(10).required(),
  price: Joi.number().precision(2).required(),
});

const getProductById = (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.json(product);
};

const createProduct = (req, res) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const newProduct = {
    id: products.length + 1,
    ...req.body,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === parseInt(id, 10));

  if (index === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  products.splice(index, 1);
  res.status(204).end();
};

module.exports = {
  getProductById,
  createProduct,
  deleteProduct,
};