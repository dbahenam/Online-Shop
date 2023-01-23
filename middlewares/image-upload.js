const multer = require('multer');
const uuid = require('uuid').v4;

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'product-data/images'); // no error since we will hardcode destination
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storageConfig });

const configuredMulter = upload.single('image');

module.exports = configuredMulter;
