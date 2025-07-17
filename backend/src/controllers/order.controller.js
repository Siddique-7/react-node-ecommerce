import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// Place a new order
export const placeOrder = async (req, res) => {
  try {
    const { orderItems } = req.body;

    console.log("📥 Received orderItems:", orderItems);

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No items in the cart" });
    }

    let totalAmount = 0;

    for (const item of orderItems) {
      console.log("🔍 Checking product ID:", item.product);

      const product = await Product.findById(item.product);

      if (!product) {
        console.log("❌ Product not found for ID:", item.product);
        return res.status(404).json({ message: "Product not found" });
      }

      totalAmount += product.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user._id,  // Replace this if you're not using authentication
      orderItems,
      totalAmount,
    });

    console.log("✅ Order placed:", order._id);

    res.status(201).json({ order });
  } catch (error) {
    console.error("🔥 Error placing order:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get user orders
export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("orderItems.product");
  res.json(orders);
};
