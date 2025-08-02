const express = require("express");
require("dotenv").config();
const db = require("./models");

const app = express();
app.use(express.json());

// Mount student routes
app.use("/api/student", require("./routes/studentRoutes"));

// Mount payment routes
app.use("/api/payment", require("./routes/paymentRoutes"));

// Mount admin routes
app.use("/api/admin", require("./routes/adminRoutes"));

// Mount programme lookup routes
app.use("/api/programme", require("./routes/programmeRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

if (process.env.NODE_ENV !== "test") {
  db.sequelize
    .sync({ alter: false })
    .then(() => console.log("✅ DB connected. Models synced."))
    .catch((err) => console.error("❌ DB connection error:", err));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;
