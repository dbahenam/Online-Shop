const express = require('express');
const cartController = require('../controllers/cart.controller');

const router = express.Router();

router.post('/items', cartController.addCartItem);

router.get('/cart', cartController.getCart);

module.exports = router;
