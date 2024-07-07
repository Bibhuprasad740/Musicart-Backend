const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/placeOrder", orderController.placeOrder);

// orders/user/<userId>
router.get("/user/:userId", orderController.getOrders);

// orders/<orderId>
router.get("/:orderId", orderController.getOrder);

module.exports = router;
