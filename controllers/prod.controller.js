const Product = require('../models/product.model');

async function getProducts(req, res, next) {
  let products;
  try {
    products = await Product.getAll();
    return res.render('customer/products/all-products', { products: products });
  } catch (error) {
    next(error);
    return;
  }
}

async function getDetails(req, res, next) {
  let productCollection;
  try {
    productCollection = await Product.getByID(req.params.id);
    const product = new Product(productCollection);
    return res.render('customer/products/details', { product: product });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getProducts: getProducts,
  getDetails: getDetails,
};
