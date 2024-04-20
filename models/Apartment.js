

const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  beds: { type: Number, required: true },
  space: { type: Number, required: true },
  phoneNumber: { type: String },
  pictureUrls: [{ type: String }],
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
