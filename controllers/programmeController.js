const {
  programme_mode: ProgrammeMode,
  programme_type: ProgrammeType,
} = require("../models");

// Retrieve all programme modes
exports.getProgrammeModes = async (req, res) => {
  try {
    const modes = await ProgrammeMode.findAll();
    res.json(modes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", err });
  }
};

// Retrieve all programme types
exports.getProgrammeTypes = async (req, res) => {
  try {
    const types = await ProgrammeType.findAll();
    res.json(types);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", err });
  }
};

