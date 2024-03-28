const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// /cart/fetchCart
router.get("/fetchCart", cartController.fetchCart);

// /cart/update
router.post("/update", cartController.updateCart);

module.exports = router;
