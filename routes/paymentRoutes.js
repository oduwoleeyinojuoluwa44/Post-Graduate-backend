const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/upload");
const paymentController = require("../controllers/paymentController");

// Upload receipt
router.post(
  "/upload",
  verifyToken,
  upload.single("receipt"),
  paymentController.uploadReceipt
);

// Approve payment by bursar or PG officer
router.put(
  "/approve/:id",
  verifyToken,
  paymentController.approvePayment
);

// View all payments (admin use)
router.get("/", verifyToken, paymentController.getAllPayments);

module.exports = router;
