const { Payment } = require("../models");

exports.uploadReceipt = async (req, res) => {
  try {
    const { payment_type } = req.body;
    const file = req.file;

    if (
      !payment_type ||
      !["school_fee", "application_form", "acceptance_form"].includes(payment_type)
    ) {
      return res.status(400).json({ msg: "Invalid or missing payment type." });
    }

    if (!file) {
      return res.status(400).json({ msg: "Receipt file is required." });
    }

    const payment = await Payment.create({
      application_id: req.user.id,
      payment_type,
      receipt_filename: file.originalname,
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

// APPROVE OR REJECT PAYMENT
exports.approvePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reviewer } = req.body;

    if (!status || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status." });
    }

    const payment = await Payment.findByPk(id);
    if (!payment) return res.status(404).json({ msg: "Payment not found." });

    payment.status = status;
    payment.reviewed_by = reviewer || null;
    payment.reviewed_at = new Date();
    await payment.save();

    res.json({ msg: `Payment ${status}.`, payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", err });
  }
};

// VIEW ALL PAYMENTS
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", err });
  }
};
