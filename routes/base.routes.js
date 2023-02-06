const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
  res.redirect('/products');
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
