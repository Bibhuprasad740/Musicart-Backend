const Product = require("../database/models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    console.log("Error in ProductController.getAllProducts", error);
    res.status(500).send("Can not get Products!");
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).send("No product found!");
    }
    return res.status(200).send(product);
  } catch (error) {
    console.log("Error in ProductController.getProduct", error);
    res.status(500).send("Can not get Products!");
  }
};
