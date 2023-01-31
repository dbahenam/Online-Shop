const Product = require('../models/product.model');

async function getProducts(req, res, next) {
  let products;
  try {
    products = await Product.getAll();
    return res.render('products', { products: products });
  } catch (error) {
    next(error);
    return;
  }
}

async function getDetails(req, res, next) {
  const productCollection = await Product.getByID(req.params.id);
  const product = new Product(productCollection);
  res.render('details', { product: product });
}

module.exports = {
  getProducts: getProducts,
  getDetails: getDetails,
};
