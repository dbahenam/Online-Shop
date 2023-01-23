const router = require('express').Router();

const adminController = require('../controllers/admin.controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

router.get('/products', adminController.getProducts);

router.get('/add-product', adminController.addProduct);

router.post('/add-product', imageUploadMiddleware, adminController.newProduct);

router.get('/products/:id', adminController.getProduct);

router.post(
  '/products/:id',
  imageUploadMiddleware,
  adminController.updateProduct
);

router.post('/delete/:id', adminController.deleteProduct);

module.exports = router;
