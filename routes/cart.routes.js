const express = require('express');
const cartController = require('../controllers/cart.controller');

const router = express.Router();

router.get('/cart', cartController.getCart);

router.post('/items', cartController.addCartItem);

router.patch('/items', cartController.patchCartItems);

module.exports = router;
