const multer = require('multer');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Define the filename of the uploaded image
  }
});

// Create Multer middleware with configured storage
const upload = multer({ storage: storage });

// Export the Multer middleware
module.exports = upload;
