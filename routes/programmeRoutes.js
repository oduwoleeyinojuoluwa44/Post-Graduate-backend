const express = require("express");
const router = express.Router();
const programmeController = require("../controllers/programmeController");

// Get all programme modes
router.get("/modes", programmeController.getProgrammeModes);

// Get all programme types
router.get("/types", programmeController.getProgrammeTypes);

module.exports = router;

