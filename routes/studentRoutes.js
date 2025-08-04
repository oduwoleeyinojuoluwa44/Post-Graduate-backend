const express = require("express");
const router = express.Router();
const {
  registerStudent,
  loginStudent,
  uploadReceipt,
  getStatus,
} = require("../controllers/studentController");
const verifyToken = require("../middleware/verifyToken");
const { verifyCode } = require("../middleware/authMiddleware");

// Registration
router.post("/apply", verifyCode, registerStudent);

// Login
router.post("/login", verifyCode, loginStudent);

// Upload Payment Receipt
router.post("/payment", verifyToken, uploadReceipt);

// View Application/Payment Status
router.get("/status", verifyToken, getStatus);

module.exports = router;
