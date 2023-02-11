const Order = require('../models/orders.model');
const User = require('../models/user.model');

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  let userDocument;
  try {
    userDocument = await User.findByID(res.locals.uid);
    const order = new Order(cart, userDocument);
    await order.save();
  } catch (error) {
    return next(error);
  }
  req.session.cart = null;
  res.redirect('/orders');
}

function getOrders(req, res, next) {
  res.render('customer/all-orders');
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
};
