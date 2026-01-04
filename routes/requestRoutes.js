const express = require("express");
const router = express.Router();
const controller = require("../controllers/requestController");
const authMiddleware = require("../middleware/MiddleWare");

// Routes
router.post("/request/send",authMiddleware, controller.sendRequest);
router.get("/history", authMiddleware, controller.getHistory);
router.get("/history/:id",authMiddleware, controller.getSingleHistory);
router.delete("/history/:id", authMiddleware, controller.deleteSingleHistory);
router.delete("/history", authMiddleware, controller.clearAllHistory);
router.get("/authenticate" , authMiddleware ,controller.authenticate)

module.exports = router;
