const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// api/products
router.get("/products", productController.getAllProducts);

// api/products/abc
router.get("/products/:productId", productController.getProduct);

module.exports = router;
