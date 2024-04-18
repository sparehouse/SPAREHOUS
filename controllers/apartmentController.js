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
async function getApartmentsByLocation(req, res) {
  try {
    const { location } = req.query;
    const apartments = await Apartment.find({ location: { $regex: new RegExp(location, 'i') } });
    res.json(apartments);
  } catch (error) {
    console.error('Error fetching apartments by location:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getApartmentsByBeds(req, res) {
  try {
    const { beds } = req.query;
    const apartments = await Apartment.find({ beds: parseInt(beds) });
    res.json(apartments);
  } catch (error) {
    console.error('Error fetching apartments by beds:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getApartmentsByPriceRange(req, res) {
  try {
    const { minPrice, maxPrice } = req.query;
    const apartments = await Apartment.find({ price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) } });
    res.json(apartments);
  } catch (error) {
    console.error('Error fetching apartments by price range:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


module.exports = { getAllApartments,getApartmentsByLocation, getApartmentsByBeds, getApartmentsByPriceRange };
