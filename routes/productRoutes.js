const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// products/
router.get("/all", productController.getAllProducts);

// products/<productId>
router.get("/:productId", productController.getProduct);

module.exports = router;
