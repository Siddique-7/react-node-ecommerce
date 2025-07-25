import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product",
        required: true
      },
      quantity: { type: Number, required: true },
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, default: "Pending" },
  isDelivered: { type: Boolean, default: false },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
