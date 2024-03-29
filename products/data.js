const { getDb } = require("../db/mongo");
const { ObjectId } = require("mongodb");

const productsCollectionName = "products";

const products = [{ id: 1, name: 'Produto 1', size: 'M', price: 10.0 },
{ id: 2, name: 'Produto 2', size: 'L', price: 20.0 },
{ id: 3, name: 'Produto 3', size: 'XL', price: 30.0 },
{ id: 4, name: 'Produto 4', size: 'XXL', price: 40.0 },
{ id: 5, name: 'Produto 5', size: 'XXXL', price: 50.0 },
{ id: 6, name: 'Produto 6', size: '4XL', price: 60.0 },
{ id: 7, name: 'Produto 7', size: '5XL', price: 70.0 },
{ id: 8, name: 'Produto 8', size: '6XL', price: 80.0 },
{ id: 9, name: 'Produto 9', size: '7XL', price: 90.0 },
{ id: 10, name: 'Produto 10', size: '8XL', price: 100.0 },
];


const createProduct = async (req, res) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const db = getDb();
  const collection = db.collection(productsCollectionName);

  const newProduct = {
    ...req.body,
    _id: new ObjectId(),
  };

  const result = await collection.insertOne(newProduct);
  res.status(201).json(result.ops[0]);
};

module.exports = {
  products,
  createProduct,
};