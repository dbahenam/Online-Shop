const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
  return res.redirect('/products');
});

// unauthorized
router.get('shared/errors/401', function (req, res) {
  res.render('errors/401');
});

// admin
router.get('shared/errors/403', function (req, res) {
  res.render('errors/403');
});

module.exports = router;
