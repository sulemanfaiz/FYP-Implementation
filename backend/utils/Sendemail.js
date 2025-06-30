// utils/sendEmail.js
require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Plain JS object so you can extend later (HTML, attachments, etc.)
module.exports = async ({ to, subject, text, html }) => {
  await transporter.sendMail({
    from: `"Rent‑A‑Space" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
};
