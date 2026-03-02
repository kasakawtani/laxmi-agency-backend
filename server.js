const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
require("dotenv").config();

const app = express();

// define backend base URL (useful in links or debugging)
const BASE_URL = process.env.BACKEND_URL || "http://localhost:5000";

// CORS setup - allow frontend origin or localhost development URL
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      "http://localhost:5173"
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));
// DB
connectDB();

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Agency Backend Running");
});

// expose API base URL (optional) for debugging
app.get("/api-url", (req, res) => {
  res.json({ baseUrl: BASE_URL });
});

// ROUTES (THIS IS THE KEY PART)
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/categories", require("./src/routes/categoryRoutes"));
app.use("/api/items", require("./src/routes/itemRoutes"));
app.use("/api/sellers", require("./src/routes/sellerRoutes"));
app.use("/api/stocks", require("./src/routes/stockRoutes"));
app.use("/api/inquiries", require("./src/routes/inquiryRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
