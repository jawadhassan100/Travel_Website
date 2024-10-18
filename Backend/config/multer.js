const multer = require('multer');
const { storage } = require('./cloudinary');

// Configure Multer to use Cloudinary storage
const upload = multer({ storage });

module.exports = upload;
