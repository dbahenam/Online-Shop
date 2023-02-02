const Product = require('../models/product.model');

async function addCartItem(req, res) {
  const product = await Product.getByID(req.body.productID);
  const cart = res.locals.cart;
  cart.addItem(product);
  req.session.cart = cart;
  res.status(201).json({
    message: 'Cart updated',
    totalItems: cart.totalItems,
  });
}

async function patchCartItems(req, res) {
  const product = await Product.getByID(req.body.productID);
  const cart = res.locals.cart;
  if (req.body.action === 'add') {
    cart.addItem(product);
  } else {
    cart.removeItem(product);
  }
  req.session.cart = cart;
  res.status(201).json({
    message: 'Cart Updated',
    totalItems: cart.totalItems,
    totalPrice: cart.totalPrice,
  });
}

function getCart(req, res) {
  const cart = res.locals.cart;
  const cartInfo = {
    totalItems: cart.totalItems,
    totalPrice: cart.totalPrice,
  };
  const items = cart.items;
  let products = [];
  for (let i = 0; i < items.length; i++) {
    products[i] = items[i].product;
  }
  products = products.map(function (productDocument) {
    return new Product(productDocument);
  });
  res.render('customer/cart', {
    products: products,
    items: items,
    cartInfo: cartInfo,
  });
}

module.exports = {
  addCartItem: addCartItem,
  patchCartItems: patchCartItems,
  getCart: getCart,
};
