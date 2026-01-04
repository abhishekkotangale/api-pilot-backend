import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import requestRoutes from "./routes/requestRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
app.use(cors({ origin: "https://api-pilot-nine.vercel.app", credentials: true }));
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
