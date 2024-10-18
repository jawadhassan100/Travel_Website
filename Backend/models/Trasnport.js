const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  vehicleImage: {
    type: String,
    required: true
  },
  vehicleName: {
    type: String,
    required: true
  },
  fullVehicleName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  vehicleImages: [
    {
      type: String,
      required: true
    }
  ]
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
