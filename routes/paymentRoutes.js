const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const paymentController = require("../controllers/paymentController");

// Upload receipt
router.post(
  "/upload",
  upload.single("receipt"),
  paymentController.uploadReceipt
);

// Approve payment by bursar or PG officer
router.put(
  "/approve/:id",
  paymentController.approvePayment
);

// View all payments (admin use)
router.get("/", paymentController.getAllPayments);

module.exports = router;
