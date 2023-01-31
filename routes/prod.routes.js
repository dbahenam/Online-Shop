const express = require('express');
const productController = require('../controllers/prod.controller');

const router = express.Router();

router.get('/products', productController.getProducts);

router.get('/products/:id', productController.getDetails);

module.exports = router;
