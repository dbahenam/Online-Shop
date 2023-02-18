const Product = require('../models/product.model');
const Orders = require('../models/orders.model');

async function getProducts(req, res) {
  if (!res.locals.isAdmin) {
    res.render('shared/errors/401');
    return;
  }
  try {
    const products = await Product.getAll();
    res.render('admin/products/all-products', { products: products });
  } catch (error) {
    next(error);
    return;
  }
}

function addProduct(req, res) {
  if (!res.locals.isAdmin) {
    res.render('shared/errors/401');
    return;
  }
  res.render('admin/products/add-product');
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
  res.redirect('/admin/products/all-products');
}

async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.getByID(req.params.id);
    res.render('admin/products/product-detail', { product: product });
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
  res.redirect('/admin/products/all-products');
}

async function deleteProduct(req, res, next) {
  await Product.deleteByID(req.params.id);
  res.redirect('/admin/products/all-products');
}

async function getOrders(req, res, next) {
  let orders;
  try {
    orders = await Orders.getAll();
    res.render('admin/orders/all-orders', { orders: orders });
  } catch (error) {
    next(error);
  }
}

async function patchOrders(req, res, next) {
  const data = req.body;
  const orderID = data.orderID;
  const status = data.status;
  let order;
  try {
    order = await Orders.findByOrderID(orderID);
    order.status = status;
    await order.save();
    res.status(201).json({
      message: 'Order updated successfully',
      status: order.status,
    });
  } catch (error) {
    return next(error);
  }
  return;
}

module.exports = {
  getProducts: getProducts,
  newProduct: newProduct,
  addProduct: addProduct,
  getProduct: getProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getOrders: getOrders,
  patchOrders: patchOrders,
};
