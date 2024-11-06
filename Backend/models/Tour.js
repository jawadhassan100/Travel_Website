const mongoose = require('mongoose');

const famousPlaceSchema = new mongoose.Schema({
  name: String,
  image: String // This will store the Cloudinary image URL
});

const tourSchema = new mongoose.Schema({
  cityName: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  tourImage: { type: String, required: true }, // This will store the Cloudinary image URL
  tourDetailImage: { type: String, required: true },
  famousPlaces: [famousPlaceSchema] // Array of famous places with name and image
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
