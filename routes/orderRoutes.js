const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/placeOrder", orderController.placeOrder);

router.get("/orders/:userId", orderController.getOrders);

router.get("/order/:orderId", orderController.getOrder);

module.exports = router;
