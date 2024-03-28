const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    price: {
      cartTotal: {
        type: Number,
        required: true,
      },
      delivery: {
        type: Number,
        required: true,
      },
    },
    // address: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Address",
    //   required: true,
    // },
    address: {
      type: String,
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["POD", "UPI", "CARD"],
    },
    status: {
      type: String,
      enum: ["Received", "Shipped", "Delivered"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
