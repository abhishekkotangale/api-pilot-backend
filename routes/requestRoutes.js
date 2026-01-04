import express from "express";
import controller from "../controllers/requestController.js";
import authMiddleware from "../middleware/MiddleWare.js";

const router = express.Router();

// Routes
router.post("/request/send", authMiddleware, controller.sendRequest);
router.get("/authenticate", authMiddleware, controller.authenticate);


router.post("/history", authMiddleware, controller.saveHistory);
router.get("/history", authMiddleware, controller.getSavedHistory);
router.delete("/history/:id", authMiddleware, controller.deleteSavedHistory);

// ESM default export
export default router;
