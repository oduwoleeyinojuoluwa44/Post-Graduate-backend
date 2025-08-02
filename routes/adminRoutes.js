const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const verifyToken = require("../middleware/verifyToken");

// Register a new admin (only ICT can do this)
router.post("/register", verifyToken, adminController.registerAdmin);

// Admin login (using staff_id + password)
router.post("/login", adminController.loginAdmin);

// View all registered admins (protected)
router.get("/admins", verifyToken, adminController.getAllAdmins);

// View a specific staff record from staff_tab (protected)
router.get("/staff/:id", verifyToken, adminController.getStaffInfo);

module.exports = router;
