import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/MiddleWare.js";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/auth/google", authController.googleAuth);
router.get("/authenticate", authMiddleware, authController.authenticate);
router.get("/logout", authMiddleware, authController.logout);

// ESM default export
export default router;
