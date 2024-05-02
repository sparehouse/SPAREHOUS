
const upload = require('../middlewares/multer');
const express = require('express');
const router = express.Router();
const apartmentController = require('../controllers/apartmentController');

router.get('/apartments', apartmentController.getAllApartments);
router.get('/apartments/location', apartmentController.getApartmentsByLocation);
router.get('/apartments/beds', apartmentController.getApartmentsByBeds);
router.get('/apartments/price', apartmentController.getApartmentsByPriceRange);
router.post('/apartments/add', upload.array('images', 5), apartmentController.addApartment);
module.exports = router;
