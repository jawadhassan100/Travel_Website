const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" })

const createTransporter = () => {
    return nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Hostinger SMTP server
        port: 465, // SSL port for Hostinger
        secure: true, 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

module.exports = createTransporter;
