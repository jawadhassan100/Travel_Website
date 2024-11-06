const express = require('express');
const {  addTour,
    getAllTours,
    getTourById,
    updateTour,
    deleteTour } = require('../controllers/tourController');
const upload = require('../config/multer'); // Import Multer middleware
const { auth, adminAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to add a new tour (with image uploads)
router.post('/', upload.fields([
  { name: 'tourImage', maxCount: 1 },
  { name: 'tourDetailImage', maxCount: 1 },
  { name: 'famousPlaces[0][image]', maxCount: 1 },
  { name: 'famousPlaces[1][image]', maxCount: 1 },
  { name: 'famousPlaces[2][image]', maxCount: 1 },
  { name: 'famousPlaces[3][image]', maxCount: 1 },
  { name: 'famousPlaces[4][image]', maxCount: 1 }
]), auth, adminAuth, addTour);

// Route to get all tours
router.get('/',  getAllTours);

// Route to get a single tour by ID
router.get('/:id',  getTourById);

// Route to update a tour by ID (with optional image uploads)
router.put('/:id', upload.fields([
  { name: 'tourImage', maxCount: 1 },
  { name: 'tourDetailImage', maxCount: 1 },
  { name: 'famousPlaces[0][image]', maxCount: 1 },
  { name: 'famousPlaces[1][image]', maxCount: 1 },
  { name: 'famousPlaces[2][image]', maxCount: 1 },
  { name: 'famousPlaces[3][image]', maxCount: 1 },
  { name: 'famousPlaces[4][image]', maxCount: 1 }
]), auth, adminAuth ,updateTour);

// Route to delete a tour by ID
router.delete('/:id',auth, adminAuth , deleteTour);

module.exports = router;
