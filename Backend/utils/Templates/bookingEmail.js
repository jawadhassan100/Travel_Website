const bookingEmail = (userName, tourName , transportType , totalPrice) => {
    // Basic email structure
    return `
    <div style="font-family: Arial, sans-serif; margin: 20px;">
      <h1 style="color: black; text-align:center;">Booking Confirmation</h1>
      <p>Hello ${userName},</p>
      <p>Thank you for your booking!</p>
      <h2 style="color: #333;">Booking Details:</h2>
      <ul style="list-style: none; padding: 0;">
        ${tourName ? `<li style="margin-bottom: 10px;"><strong>Tour Name:</strong> ${tourName} <br /></li>` : ''}
        ${transportType ? `<li style="margin-bottom: 10px;"><strong>Transport Type:</strong> ${transportType} <br /></li>` : ''}
      </ul>
      <p><strong>Total Price:</strong> ${totalPrice} PKR</p>
      <p>We will send you further information regarding your booking shortly.</p>
      <p style="margin-top: 20px;">Thank you for choosing us!</p>
      <footer style="margin-top: 40px; font-size: 0.9em; color: #777;">
        <p>Best Regards,</p>
        <p>Your Travel Agency</p>
      </footer>
    </div>
  `;
  };

  module.exports = bookingEmail