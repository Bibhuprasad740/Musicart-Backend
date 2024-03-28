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
