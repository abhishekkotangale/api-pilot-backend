const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const requestRoutes = require("./routes/requestRoutes");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");


dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// DB
connectDB();

// Routes
app.use("/api", requestRoutes);
app.use("/auth", authRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
