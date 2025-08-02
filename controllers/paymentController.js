const { Payment } = require("../models");
const sendMail = require("../utils/mailer");

exports.uploadReceipt = async (req, res) => {
  try {
    const { type } = req.body;
    const { file } = req;

    if (!type || !["school_fee", "application_form", "acceptance_form"].includes(type)) {
      return res.status(400).json({ msg: "Invalid or missing payment type." });
    }

    if (!file) {
      return res.status(400).json({ msg: "Receipt file is required." });
    }

    const payment = await Payment.create({
      application_id: req.user.id,
      type,
      file: file.buffer,
      filename: file.originalname,
      mimetype: file.mimetype,
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
