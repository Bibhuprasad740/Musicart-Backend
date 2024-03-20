const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// /auth/signup
router.post("/signup", authController.signup);

// /auth/signin
router.post("/signin", authController.signin);

module.exports = router;
