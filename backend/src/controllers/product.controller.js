// controllers/product.controller.js
import Product from '../models/product.model.js';
import cloudinary from '../config/cloudinary.js';

export const createProduct = async (req, res) => {
  try {
    const { title, price, description, category, brand, countInStock } = req.body;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "Image upload failed or missing" });
    }

    // Upload image buffer to Cloudinary
    const cloudinaryUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'products',
            transformation: [{ width: 500, height: 500, crop: 'limit' }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await cloudinaryUpload(); // Cloudinary response

    const product = await Product.create({
      title,
      price,
      description,
      category,
      brand,
      countInStock,
      image: result.secure_url, // ✅ Image URL from Cloudinary
      createdBy: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({ message: "Product creation failed", error: error.message });
  }
};
