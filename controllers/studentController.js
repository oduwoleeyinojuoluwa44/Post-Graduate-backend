const { Student, Payment } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/mailer");

// Utility: Email validation
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// REGISTER STUDENT
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password, application_id, matric_number } = req.body;

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

    if (matric_number) {
      const existingMatric = await Student.findOne({ where: { matric_number } });
      if (existingMatric)
        return res.status(400).json({ msg: "Matric number already exists." });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      application_id,
      matric_number,
    });

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

    if (!password || (!email && !matric_number && !application_id))
      return res
        .status(400)
        .json({ msg: "Email, matric number or application ID and password are required." });

    if (email && !isValidEmail(email))
      return res.status(400).json({ msg: "Invalid email format." });

    let student;
    if (email) student = await Student.findOne({ where: { email } });
    else if (matric_number) student = await Student.findOne({ where: { matric_number } });
    else student = await Student.findOne({ where: { application_id } });

    if (!student)
      return res.status(400).json({ msg: "No account found." });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid password." });

    // Optional checks for additional identifiers
    if (email && student.email !== email)
      return res.status(400).json({ msg: "Email mismatch." });

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

// UPLOAD PAYMENT RECEIPT
exports.uploadReceipt = async (req, res) => {
  try {
    const { payment_type, receipt_filename } = req.body;

    if (
      !payment_type ||
      !["school_fee", "application_form", "acceptance_form"].includes(payment_type)
    ) {
      return res.status(400).json({ msg: "Invalid or missing payment type." });
    }

    if (!receipt_filename) {
      return res.status(400).json({ msg: "Receipt filename is required." });
    }

    const student = await Student.findByPk(req.user.id);
    if (!student) return res.status(404).json({ msg: "Student not found." });

    const payment = await Payment.create({
      application_id: student.application_id,
      payment_type,
      receipt_filename,
      status: "pending",
    });

    res.status(201).json({
      msg: "Receipt uploaded successfully. Awaiting review.",
      paymentId: payment.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", err });
  }
};

// VIEW APPLICATION/PAYMENT STATUS
exports.getStatus = async (req, res) => {
  try {
    const student = await Student.findByPk(req.user.id);
    if (!student) return res.status(404).json({ msg: "Student not found." });

    const payments = await Payment.findAll({
      where: { application_id: student.application_id },
      attributes: ["id", "payment_type", "status", "receipt_filename", "reviewed_by", "reviewed_at"],
    });

    res.json({ payments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", err });
  }
};
