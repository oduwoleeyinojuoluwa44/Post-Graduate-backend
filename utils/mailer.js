const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // You can replace with your preferred SMTP
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = async ({ to, subject, text, html }) => {
  // Skip sending emails during tests or when credentials are missing
  if (process.env.NODE_ENV === "test" || !process.env.EMAIL_USER) return;

  try {
    await transporter.sendMail({
      from: `"Crescent PG Portal" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};
