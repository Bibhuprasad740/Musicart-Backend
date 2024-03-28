const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    desription: {
      type: String,
      required: true,
    },
    features: [
      {
        type: String,
        required: true,
      },
    ],
    imageUrls: [
      {
        type: String,
        required: true,
      },
    ],
    type: {
      type: String,
      enum: ["inear", "onear", "overear"],
      required: true,
    },
    rating: {
      totalCount: {
        type: Number,
        required: true,
      },
      productRating: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
