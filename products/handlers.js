const Joi = require('joi');
const products = require("./data");
const {getDb} = require("../db/mongo")

const productCollectionName = "products";

async function getProductsCollection() {
  const db = await getDb();
  return db.collection(productCollectionName);
}

async function findProduct(filter) {
  const productCollection = await getProductsCollection();
  return productCollection.findOne(filter);
}

async function deleteProductFromDb(id) {
  const productCollection = await getProductsCollection();
  return productCollection.deleteOne({ id: parseInt(id, 10) });
}
const productSchema = Joi.object({
  id: Joi.number().integer().min(1).max(10),
  name: Joi.string().min(1).max(50).required(),
  size: Joi.string().min(1).max(10).required(),
  price: Joi.number().precision(2).required(),
});

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await findProduct({ id: parseInt(id, 10) });

  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = await deleteProductFromDb(id);

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  res.status(204).end();
};