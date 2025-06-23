const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));          // For public HTML/JS
app.use('/css', express.static(path.join(__dirname, 'css')));     // External CSS folder

// Route for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Email handling route
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Setup nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'asi.kolchp@gmail.com',        // Your Gmail
      pass: 'your_app_password_here'       // App Password (not your regular Gmail password)
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,          // Sender's name and their email
    to: 'asi.kolchp@gmail.com',            // Your receiving email
    subject: 'New Contact Form Submission',
    html: `
      <h2>New Contact Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
    replyTo: email
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully');
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email. Try again later.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
