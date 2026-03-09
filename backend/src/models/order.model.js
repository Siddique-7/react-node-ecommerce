import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // price at order time
    }
  ],

  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },

  totalAmount: { type: Number, required: true },

  paymentMethod: { type: String, default: "UPI" }, 
  paymentStatus: { 
    type: String, 
    enum: ["Pending", "Paid", "Failed"], 
    default: "Pending" 
  },
  transactionId: { type: String }, 
  isDelivered: { type: Boolean, default: false },

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;