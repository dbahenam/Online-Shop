const Product = require('../models/product.model');

async function getProducts(req, res) {
  if (!res.locals.isAdmin) {
    res.render('errors/401');
    return;
  }
  try {
    const products = await Product.getAll();
    res.render('admin/products', { products: products });
  } catch (error) {
    next(error);
    return;
  }
}

function addProduct(req, res) {
  if (!res.locals.isAdmin) {
    res.render('errors/401');
    return;
  }
  res.render('admin/add-product');
}

async function newProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });
  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect('/admin/products');
}

async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.getByID(req.params.id);
    res.render('admin/product-detail', { product: product });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });
  if (req.file) {
    product.updateImage(req.file.filename);
  }
  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect('/admin/products');
}

async function deleteProduct(req, res, next) {
  await Product.deleteByID(req.params.id);
  res.redirect('/admin/products');
}

module.exports = {
  getProducts: getProducts,
  newProduct: newProduct,
  addProduct: addProduct,
  getProduct: getProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
