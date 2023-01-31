const Cart = require('../models/cart.model');

function initializeCart(req, res, next) {
  let cart;
  if (!req.session.cart) {
    cart = new Cart();
  } else {
    cart = new Cart(
      req.session.cart.items,
      req.session.cart.totalItems,
      req.session.cart.totalPrice
    );
  }
  res.locals.cart = cart; // methods not stored in session
  next();
}

module.exports = initializeCart;
