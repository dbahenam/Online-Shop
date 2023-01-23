const Product = require('../models/product.model');

async function getProducts(req, res) {
  let products;
  try {
    products = await Product.getAll();
  } catch (error) {
    next(error);
    return;
  }
  console.log('products: ', products);
  res.render('products', { products: products });
}

module.exports = {
  getProducts: getProducts,
};
