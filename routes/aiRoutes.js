const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");
const authMiddleware = require("../middleware/MiddleWare");

// Routes
router.post("/generate",authMiddleware, aiController.generateApiRequest);

module.exports = router;
