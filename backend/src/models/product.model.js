import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  brand: String,
  countInStock: { type: Number, default: 0 },
  image: String, // URL (Cloudinary or static)
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
