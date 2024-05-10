

const Apartment = require('../models/Apartment');
const axios = require('axios');

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
    
    // Check if minPrice is greater than maxPrice
    if (parseInt(minPrice) > parseInt(maxPrice)) {
      return res.status(400).json({ message: 'minPrice cannot be greater than maxPrice' });
    }

    const apartments = await Apartment.find({ price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) } });
    res.json(apartments);
  } catch (error) {
    console.error('Error fetching apartments by price range:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
async function addApartment(req, res) {
  try {
    // Extract apartment details from request body
    const { name, location, price, beds, space, phoneNumber } = req.body;

    // Construct array to store image URLs
    let pictureUrls = [];

    // Check if files were uploaded
    if (req.files) {
      const ngrokUrl =await getNgrokPublicUrl();
      // Loop through uploaded files
      req.files.forEach(file => {
          // Append the URL of each uploaded image to the pictureUrls array
          pictureUrls.push(ngrokUrl + '/uploads/' + file.filename);
      });
  }
  
    // Create a new apartment instance
    const newApartment = new Apartment({
      name,
      location,
      price,
      beds,
      space,
      phoneNumber,
      pictureUrls
    });

    // Save the new apartment to the database
    await newApartment.save();

    res.status(201).json({ message: 'Apartment added successfully', apartment: newApartment });
  } catch (error) {
    console.error('Error adding apartment:', error);
    res.status(500).json({ message: 'Server error' });
  }
}



module.exports = { getAllApartments,getApartmentsByLocation, getApartmentsByBeds, getApartmentsByPriceRange, addApartment };
