const createTransporter = require('../config/smtpConfig');


const sendEmail = (userEmail, subject, htmlContent) => {
    const transporter = createTransporter(); // Use the transporter from smtpConfig

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: subject,
        html: htmlContent // Use HTML content
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            // Log detailed error information for debugging
            console.error('Email failed to send:', {
                from: mailOptions.from,
                to: mailOptions.to,
                subject: mailOptions.subject,
                text: mailOptions.text
            });
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = sendEmail