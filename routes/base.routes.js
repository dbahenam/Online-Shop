const express = require('express');
const productController = require('../controllers/prod.controller');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('index');
});

// unauthorized
router.get('/errors/401', function (req, res) {
  res.render('errors/401');
});

// admin
router.get('/errors/403', function (req, res) {
  res.render('errors/403');
});

module.exports = router;
