const Tour = require('../models/Tour');

// Controller to add a new tour
exports.addTour = async (req, res) => {
  try {
    const { cityName, duration, price, description } = req.body;

    const famousPlaces = req.body.famousPlaces.map((place, index) => ({
      name: place.name,
      image: req.files[`famousPlaces[${index}][image]`][0].path // Cloudinary image URL
    }));

    const newTour = new Tour({
      cityName,
      duration,
      price,
      description,
      tourImage: req.files.tourImage[0].path, // Cloudinary image URL
      famousPlaces
    });

    await newTour.save();
    res.status(201).json({ message: 'Tour added successfully', tour: newTour });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding tour', error });
  }
};


// Controller to get all tours
exports.getAllTours = async (req, res) => {
    try {
      const tours = await Tour.find(); // Fetch all tours from the database
      res.status(200).json(tours);
    } catch (error) {
      console.error('Error fetching tours:', error);
      res.status(500).json({ message: 'Error fetching tours', error });
    }
  };

// Controller to get a tour by ID
exports.getTourById = async (req, res) => {
    try {
      const { id } = req.params; // Extract tour ID from the request parameters
      const tour = await Tour.findById(id); // Find tour by ID
  
      if (!tour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
  
      res.status(200).json(tour);
    } catch (error) {
      console.error('Error fetching tour:', error);
      res.status(500).json({ message: 'Error fetching tour', error });
    }
  };
  
  // Controller to update a tour by ID
exports.updateTour = async (req, res) => {
    try {
      const { id } = req.params; // Extract tour ID from the request parameters
      const { cityName, duration, price, description } = req.body;
  
      // Prepare the update object
      const updateData = {
        cityName,
        duration,
        price,
        description,
      };
  
      // Update images only if they are provided
      if (req.files.tourImage) {
        updateData.tourImage = req.files.tourImage[0].path; // New main tour image
      }
  
      if (req.body.famousPlaces) {
        updateData.famousPlaces = req.body.famousPlaces.map((place, index) => ({
          name: place.name,
          image: req.files[`famousPlaces[${index}][image]`] ? req.files[`famousPlaces[${index}][image]`][0].path : place.image
        }));
      }
  
      const updatedTour = await Tour.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }); // Update tour and return the new object
  
      if (!updatedTour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
  
      res.status(200).json({ message: 'Tour updated successfully', tour: updatedTour });
    } catch (error) {
      console.error('Error updating tour:', error);
      res.status(500).json({ message: 'Error updating tour', error });
    }
  };
  
  // Controller to delete a tour by ID
 exports.deleteTour = async (req, res) => {
    try {
      const { id } = req.params; // Extract tour ID from the request parameters
      const deletedTour = await Tour.findByIdAndDelete(id); // Delete tour by ID
  
      if (!deletedTour) {
        return res.status(404).json({ message: 'Tour not found' });
      }
  
      res.status(200).json({ message: 'Tour deleted successfully', tour: deletedTour });
    } catch (error) {
      console.error('Error deleting tour:', error);
      res.status(500).json({ message: 'Error deleting tour', error });
    }
  };
  