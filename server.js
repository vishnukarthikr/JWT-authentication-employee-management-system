require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "JWT Auth API Running"
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(`Frontend URL: http://localhost:${process.env.PORT}`);
});