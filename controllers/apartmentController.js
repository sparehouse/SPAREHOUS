// src/controllers/apartmentController.js

const Apartment = require('../models/Apartment');

async function getAllApartments(req, res) {
  try {
    const apartments = await Apartment.find();
    res.json(apartments);
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getAllApartments };
