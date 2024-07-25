const Product = require("../database/models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const filters = req.query.filters || {};
    const searchQuery = req.query.searchQuery || "";

    let query = Product.find();
    if (searchQuery !== "") {
      query = query.where("name").regex(new RegExp(searchQuery, "i"));
    }
    if (filters.typeFilter != "") {
      query = query.where("type").equals(filters.typeFilter);
    }
    if (filters.companyFilter != "") {
      query = query.where("brand").equals(filters.companyFilter.toUpperCase());
    }
    if (filters.colorFilter != "") {
      const color =
        filters.colorFilter.charAt(0).toUpperCase() +
        filters.colorFilter.slice(1);
      query = query.where("color").equals(color);
    }
    if (filters.priceFilter !== "") {
      const minPrice = parseInt(filters.priceFilter.split("-")[0]);
      const maxPrice = parseInt(filters.priceFilter.split("-")[1]);
      query = query.where("price").gte(minPrice).lte(maxPrice);
    }
    if (filters.sortingFilter !== "") {
      switch (filters.sortingFilter) {
        case "low-high":
          query = query.sort({ price: 1 });
          break;
        case "high-low":
          query = query.sort({ price: -1 });
          break;
        case "a-z":
          query = query.sort({ name: 1 });
          break;
        case "z-a":
          query = query.sort({ name: -1 });
          break;
        default:
          query = query.sort({ price: 1 });
      }
    }

    const products = await query.exec();
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
