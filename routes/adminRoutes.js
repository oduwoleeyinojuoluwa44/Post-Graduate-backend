const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Register a new admin (no auth required for initial setup)
router.post("/register", adminController.createAdmin);

// Create staff profile
router.post("/create-staff", adminController.createStaffProfile);

// Admin login (using staff_id + password)
router.post("/login", adminController.loginAdmin);

// View all registered admins
router.get("/admins", adminController.getAllAdmins);

// View all registered students
router.get("/students", adminController.getAllStudents);

// View a specific staff record from staff_tab
router.get("/staff/:id", adminController.getStaffInfo);

module.exports = router;
