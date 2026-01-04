import express from "express";
import aiController from "../controllers/aiController.js";
import authMiddleware from "../middleware/MiddleWare.js";

const router = express.Router();

router.post("/generate", authMiddleware, aiController.generateApiRequest);

export default router; 
