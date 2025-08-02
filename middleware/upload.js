const multer = require("multer");

// Multer config: store file in memory
const storage = multer.memoryStorage();

// Only JPEG and PNG
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG images are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 30 * 1024, // 30 KB
  },
});

module.exports = upload;
