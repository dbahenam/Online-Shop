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

async function getOrders(req, res, next) {
  let orders;
  try {
    orders = await Order.findByUserID(res.locals.uid);
    res.render('customer/orders/all-orders', { orders: orders });
  } catch (error) {
    return next(error);
  }

  // let orderData = [];
  // for (let i = 0; i < orders.length; i++) {
  //   const productData = orders[i].productData;
  //   orderData[i] = {
  //     items: productData.items,
  //     quantity: productData.totalItems,
  //     totalPrice: productData.totalPrice,
  //     date: orders[i].date.toDateString().substring(0, 10),
  //     status: orders[i].status,
  //   };
  // }
  // // const userData = admin only
  // console.log(orderData);
  // res.render('customer/all-orders', { orders: orderData });
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
};
