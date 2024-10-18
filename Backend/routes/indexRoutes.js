const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const tourRoutes = require('./tourRoutes')
const transportRoutes = require('./transportRoutes')
const bookingRoutes = require('./bookingRoutes')
const contactRoutes = require('./contactRoutes');
const dashboardRoutes = require('./dashboardRoutes')
// Use the user routes
router.use('/api', authRoutes);
router.use('/tour', tourRoutes);
router.use('/trasnport', transportRoutes);
router.use('/booking', bookingRoutes);
router.use('/contact', contactRoutes);
router.use('/dashboard', dashboardRoutes);
module.exports = router;