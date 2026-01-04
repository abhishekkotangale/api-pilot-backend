import express from "express";
import controller from "../controllers/requestController.js";
import authMiddleware from "../middleware/MiddleWare.js";

const router = express.Router();

// Routes
router.post("/request/send", authMiddleware, controller.sendRequest);
router.get("/history", authMiddleware, controller.getHistory);
router.get("/history/:id", authMiddleware, controller.getSingleHistory);
router.delete("/history/:id", authMiddleware, controller.deleteSingleHistory);
router.delete("/history", authMiddleware, controller.clearAllHistory);
router.get("/authenticate", authMiddleware, controller.authenticate);

// ESM default export
export default router;
