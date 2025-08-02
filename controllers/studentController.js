const { Student } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/mailer");

// Utility: Email validation
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// REGISTER STUDENT
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password, application_id } = req.body;

    if (!name || !email || !password || !application_id)
      return res.status(400).json({ msg: "All fields are required." });

    if (!isValidEmail(email))
      return res.status(400).json({ msg: "Invalid email format." });

    if (password.length < 6)
      return res.status(400).json({ msg: "Password must be at least 6 characters." });

    const existingEmail = await Student.findOne({ where: { email } });
    if (existingEmail)
      return res.status(400).json({ msg: "Email already registered." });

    const existingAppID = await Student.findOne({ where: { application_id } });
    if (existingAppID)
      return res.status(400).json({ msg: "Application ID already exists." });

    const student = await Student.create({ name, email, password, application_id });

    await sendEmail({
      to: student.email,
      subject: "Registration Successful",
      text: `Dear ${student.name},\n\nYou have successfully registered. Your Application ID is ${student.application_id}.\n\nRegards,\nCrescent University Portal`
    });

    res.status(201).json({
      msg: "Student registered successfully.",
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        application_id: student.application_id,
        matric_number: student.matric_number
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", err });
  }
};

// LOGIN STUDENT
exports.loginStudent = async (req, res) => {
  try {
    const { email, password, matric_number, application_id } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Email and password are required." });

    if (!isValidEmail(email))
      return res.status(400).json({ msg: "Invalid email format." });

    const student = await Student.findOne({ where: { email } });
    if (!student)
      return res.status(400).json({ msg: "No account found for this email." });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid password." });

    // Optional checks
    if (matric_number && student.matric_number !== matric_number)
      return res.status(400).json({ msg: "Matric number mismatch." });

    if (application_id && student.application_id !== application_id)
      return res.status(400).json({ msg: "Application ID mismatch." });

    const token = jwt.sign(
      { id: student.id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login successful",
      token,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        application_id: student.application_id,
        matric_number: student.matric_number
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", err });
  }
};
