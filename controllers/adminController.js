const { Admin, Staff, Student } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create a new admin. No authentication is required as this is used
// during the initial setup of the application. A random password is
// generated for the admin which should be changed on first login.
exports.createAdmin = async (req, res) => {
  try {
    const {
      staff_id,
      staff_firstname,
      staff_middlename,
      staff_lastname,
      phone,
      email,
      role,
    } = req.body;

    // Check for required fields
    if (!staff_id || !staff_firstname || !staff_lastname || !email || !role) {
      return res.status(400).json({ msg: "Missing required fields." });
    }

    // Check if admin already exists
    const existing = await Admin.findOne({ where: { staff_id } });
    if (existing) {
      return res.status(400).json({ msg: "Admin with this Staff ID already exists." });
    }

    // Save basic staff information if not already present
    let staffRecord = await Staff.findOne({ where: { staff_id } });
    if (!staffRecord) {
      staffRecord = await Staff.create({
        staff_id,
        staff_firstname,
        staff_middlename,
        staff_lastname,
      });
    }

    // Generate random password
    const password = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Admin user
    const admin = await Admin.create({
      staff_id,
      phone,
      email,
      password: hashedPassword,
      role,
    });

    // Return response
    return res.status(201).json({
      msg: `${role} admin created successfully.`,
      admin: {
        staff_id,
        email,
        role,
      },
      defaultPassword: password,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error", err });
  }
};

// Create a staff profile. Intended for ICT administrators to register
// academic or non‑teaching staff. No authentication is performed here,
// so it should be restricted through deployment level controls such as
// IP whitelisting.
exports.createStaffProfile = async (req, res) => {
  try {
    const {
      staff_id,
      surname,
      firstname,
      middlename,
      college,
      department,
      email,
      phone_number,
      staff_category,
    } = req.body;

    if (
      !staff_id ||
      !surname ||
      !firstname ||
      !college ||
      !department ||
      !email ||
      !phone_number ||
      !staff_category
    ) {
      return res.status(400).json({ msg: "Missing required fields." });
    }

    const existing = await Staff.findOne({ where: { staff_id } });
    if (existing) {
      return res
        .status(400)
        .json({ msg: "Staff with this Staff ID already exists." });
    }

    const staff = await Staff.create({
      staff_id,
      staff_lastname: surname,
      staff_firstname: firstname,
      staff_middlename: middlename || "",
      college,
      department,
      email,
      phone_number,
      staff_category,
    });

    return res.status(201).json({
      msg: "Staff profile created successfully.",
      staff,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error", err });
  }
};

// Admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { staff_id, password } = req.body;

    if (!staff_id || !password) {
      return res.status(400).json({ msg: "Staff ID and password are required." });
    }

    const admin = await Admin.findOne({ where: { staff_id } });
    if (!admin) return res.status(404).json({ msg: "Admin not found." });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password." });

    const token = jwt.sign(
      { id: admin.id, staff_id: admin.staff_id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login successful",
      token,
      admin: {
        staff_id: admin.staff_id,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error", err });
  }
};

// View all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({ attributes: { exclude: ["password"] } });
    res.json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", err });
  }
};

// View a specific staff from staff_tab
exports.getStaffInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await Staff.findOne({ where: { staff_id: id } });

    if (!staff) return res.status(404).json({ msg: "Staff not found." });
    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", err });
  }
};

// View all registered students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", err });
  }
};
