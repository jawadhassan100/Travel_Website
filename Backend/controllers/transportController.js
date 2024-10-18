const Vehicle = require('../models/Trasnport'); // Ensure you have the Vehicle model imported

// Controller to add a new vehicle
exports.addVehicle = async (req, res) => {
  try {
    // Extract vehicle data from the request body
    const { vehicleName, fullVehicleName, price, about } = req.body;

    // Access uploaded vehicle image and additional images
    const vehicleImage = req.files.vehicleImage[0].path; // Main vehicle image
    const vehicleImages = req.files.vehicleImages ? req.files.vehicleImages.map(img => img.path) : []; // Additional images

    // Create a new vehicle instance
    const newVehicle = new Vehicle({
      vehicleImage, // URL of the uploaded vehicle image
      vehicleName,
      fullVehicleName,
      price,
      about,
      vehicleImages // Array of URLs for additional images
    });

    // Save the vehicle to the database
    await newVehicle.save();
    
    // Send a success response
    res.status(201).json({ message: 'Vehicle added successfully', vehicle: newVehicle });
  } catch (error) {
    console.error('Error adding vehicle:', error);
    res.status(500).json({ message: 'Error adding vehicle', error });
  }
};


// Controller to get all vehicles
exports.getAllVehicles = async (req, res) => {
    try {
      const vehicles = await Vehicle.find(); // Fetch all vehicles from the database
      res.status(200).json(vehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      res.status(500).json({ message: 'Error fetching vehicles', error });
    }
  };
  
  // Controller to get a vehicle by ID
exports.getVehicleById = async (req, res) => {
    try {
      const { id } = req.params; // Extract vehicle ID from the request parameters
      const vehicle = await Vehicle.findById(id); // Find vehicle by ID
  
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      res.status(200).json(vehicle);
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      res.status(500).json({ message: 'Error fetching vehicle', error });
    }
  };
  
  // Controller to update a vehicle by ID
 exports.updateVehicle = async (req, res) => {
    try {
      const { id } = req.params; // Extract vehicle ID from the request parameters
      const { vehicleName, fullVehicleName, price, about } = req.body;
  
      // Prepare the update object
      const updateData = {
        vehicleName,
        fullVehicleName,
        price,
        about
      };
  
      // Update vehicle images only if they are provided
      if (req.files.vehicleImage) {
        updateData.vehicleImage = req.files.vehicleImage[0].path; // New main vehicle image
      }
      if (req.files.vehicleImages) {
        updateData.vehicleImages = req.files.vehicleImages.map(img => img.path); // New additional images
      }
  
      const updatedVehicle = await Vehicle.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }); // Update vehicle and return the new object
  
      if (!updatedVehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      res.status(200).json({ message: 'Vehicle updated successfully', vehicle: updatedVehicle });
    } catch (error) {
      console.error('Error updating vehicle:', error);
      res.status(500).json({ message: 'Error updating vehicle', error });
    }
  };
  
  // Controller to delete a vehicle by ID
 exports.deleteVehicle = async (req, res) => {
    try {
      const { id } = req.params; // Extract vehicle ID from the request parameters
      const deletedVehicle = await Vehicle.findByIdAndDelete(id); // Delete vehicle by ID
  
      if (!deletedVehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      res.status(200).json({ message: 'Vehicle deleted successfully', vehicle: deletedVehicle });
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      res.status(500).json({ message: 'Error deleting vehicle', error });
    }
  };
