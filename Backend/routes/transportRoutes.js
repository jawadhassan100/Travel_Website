const express = require("express");
const {
  addVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/transportController"); // Import the controller
const upload = require("../config/multer"); // Use your existing Cloudinary storage
const router = express.Router();
const { auth, adminAuth } = require('../middlewares/authMiddleware');


router.post(
  "/",
  upload.fields([
    { name: "vehicleImage", maxCount: 1 }, // Main vehicle image
    { name: "vehicleImages", maxCount: 5 }, // Up to 5 additional images
  ]),
  auth, adminAuth, addVehicle
); // Use the upload middleware

router.get("/",auth, adminAuth,  getAllVehicles); // Get all vehicles
router.get("/:id", auth, adminAuth,  getVehicleById); // Get a vehicle by ID
router.put(
  "/:id",
  upload.fields([
    { name: "vehicleImage", maxCount: 1 },
    { name: "vehicleImages", maxCount: 5 },
  ]),
  auth, adminAuth ,updateVehicle
); // Update a vehicle by ID
router.delete("/:id", auth, adminAuth , deleteVehicle); // Delete a vehicle by ID
module.exports = router;
