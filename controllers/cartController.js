const Cart = require("../database/models/Cart");

exports.fetchCart = async (req, res) => {
  console.log("Cart fetch req...");
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(200).send(null);
    }

    return res.status(200).send(cart);
  } catch (error) {
    console.log("Error in cartController.fetchCart", error);
    res.status(400).send("Error in fetching cart!");
  }
};

exports.updateCart = async (req, res) => {
  console.log("Cart update req...");
  try {
    const userId = req.userId;
    const cartData = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await new Cart({
        userId,
        items: cartData.items,
        totalQuantity: cartData.totalQuantity,
        totalPrice: cartData.totalPrice,
      });

      await cart.save();
      return res
        .status(200)
        .json({ message: "Cart updated successfully", cart });
    }

    cart.items = cartData.items;
    cart.totalQuantity = cartData.totalQuantity;
    cart.totalPrice = cartData.totalPrice;

    await cart.save();

    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.error("Error in cartController.updateCart", error);
    res.status(400).json({ message: "Error updating cart" });
  }
};
