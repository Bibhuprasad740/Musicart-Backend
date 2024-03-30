const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// /feedback/submit
router.post("/submit", feedbackController.submitFeedback);

module.exports = router;
