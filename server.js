const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
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
