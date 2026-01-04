const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/MiddleWare");


router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/auth/google", authController.googleAuth);
router.get("/authenticate", authMiddleware,authController.authenticate);
router.get("/logout", authMiddleware, authController.logout);


module.exports = router;
