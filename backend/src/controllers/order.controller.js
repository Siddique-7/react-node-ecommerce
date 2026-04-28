import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const createOrder = async (req, res) => {

 try {

  const { orderItems, shippingAddress } = req.body;

  if (!orderItems || orderItems.length === 0) {
   return res.status(400).json({
    message: "No items in the cart"
   });
  }

  let totalAmount = 0;
  const orderItemsWithPrice = [];

  for (const item of orderItems) {

   const product = await Product.findById(item.product);

   if (!product) {
    return res.status(404).json({
     message: "Product not found"
    });
   }

   totalAmount += product.price * item.quantity;

   orderItemsWithPrice.push({
    product: item.product,
    quantity: item.quantity,
    price: product.price
   });

  }

  const order = await Order.create({
   user: req.user._id,
   orderItems: orderItemsWithPrice,
   shippingAddress,
   paymentMethod: "UPI",
   paymentStatus: "Paid", // since user clicked "I have paid"
   totalAmount
  });

  res.status(201).json({
   success: true,
   order
  });

 } catch (error) {

  console.error(error);

  res.status(500).json({
   message: "Server Error"
  });

 }

};

export const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("orderItems.product", "name image price");

    res.json({
      success: true,
      orders
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch orders"
    });

  }
};

export const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("orderItems.product", "name price image");

    res.json({
      success: true,
      orders
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch orders"
    });

  }
};