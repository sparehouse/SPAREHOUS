// src/routes/apartmentRoutes.js

const express = require('express');
const router = express.Router();
const apartmentController = require('../controllers/apartmentController');

router.get('/apartments', apartmentController.getAllApartments);

module.exports = router;
