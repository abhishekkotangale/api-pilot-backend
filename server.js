const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const requestRoutes = require("./routes/requestRoutes");
const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");


dotenv.config();
const app = express();
app.use(cors({ origin: "https://api-pilot.vercel.app", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// DB
connectDB();

// Routes
app.use("/api", requestRoutes);
app.use("/auth", authRoutes);
app.use("/ai",aiRoutes)


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
