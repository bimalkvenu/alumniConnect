const nodemailer = require('nodemailer');

// Create a transporter using your email service (Gmail example)
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,  // Your email address
      pass: process.env.EMAIL_PASSWORD   // Your App password (not the Gmail password)
    }
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,  // Sender's email address
    to: options.email,                // Recipient's email address
    subject: options.subject,         // Email subject
    text: options.message             // Email message content
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
