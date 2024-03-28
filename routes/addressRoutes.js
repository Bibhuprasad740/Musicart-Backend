const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

// /addresses/:userId
router.get("/:userId", addressController.getAddresses);

module.exports = router;
