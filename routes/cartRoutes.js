const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const checkAuthorization = require("../middlewares/authorization");
const { route } = require("./productRoutes");

// /cart/fetchCart
router.get("/fetchCart", checkAuthorization, cartController.fetchCart);

// /cart/update
router.post("/update", checkAuthorization, cartController.updateCart);

module.exports = router;
