const Product = require('../models/product.model');

async function addCartItem(req, res) {
  const product = await Product.getByID(req.body.productID);
  const cart = res.locals.cart;
  cart.addItem(product);
  console.log(cart);
  req.session.cart = cart;
  res.status(201).json({
    message: 'Cart updated',
    totalItems: cart.totalItems,
  });
}

function getCart(req, res) {
  const numItems = res.locals.cart.totalItems;
  const items = res.locals.cart.items;
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
    numItems: numItems,
  });
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
};
