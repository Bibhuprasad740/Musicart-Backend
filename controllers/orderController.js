const Order = require("../database/models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { products, name, totalPrice, address, paymentMode } = req.body;

    if (
      name.trim().length === 0 ||
      products.length === 0 ||
      totalPrice === 0 ||
      address.trim().length === 0
    ) {
      return res.status(400).send("Invalid order");
    }

    const newOrder = await new Order({
      userId,
      name,
      products,
      price: {
        cartTotal: totalPrice,
        delivery: 45,
      },
      address,
      paymentMode,
      status: "Received",
    });

    await newOrder.save();

    res.status(200).send(newOrder._id);
  } catch (error) {
    console.log("Error in orderController.order", error);
    res.status(400).send("Can not place order!");
  }
};

exports.getOrders = async (req, res) => {
  try {
    console.log("Get orders request...");
    const userId = req.userId;
    const orders = await Order.find({ userId });

    res.status(200).send(orders);
  } catch (error) {
    console.log("Error in orderController.getOrders", error);
    res.status(400).send("Can not get orders!");
  }
};

exports.getOrder = async (req, res) => {
  try {
    console.log("Get order request...");
    const userId = req.userId;
    const { orderId } = req.params;
    const order = await Order.findOne({
      userId,
      _id: orderId,
    });

    res.status(200).send(order);
  } catch (error) {
    console.log("Error in orderController.getOrder", error);
    res.status(400).send("Can not get order!");
  }
};
