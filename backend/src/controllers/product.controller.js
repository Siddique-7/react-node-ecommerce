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

export const getProducts = async (req, res) => {
  try {
    const { search, category, min, max, sort, page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    let filters = [];

    if (search) filters.push({ title: { $regex: search, $options: "i" } });
    if (category) filters.push({ category: { $regex: `^${category}$`, $options: "i" } });
    if (min || max) {
      let priceFilter = {};
      if (min) priceFilter.$gte = Number(min);
      if (max) priceFilter.$lte = Number(max);
      filters.push({ price: priceFilter });
    }

    const query = filters.length ? { $and: filters } : {};

    let productsQuery = Product.find(query);

    if (sort === "price_asc") productsQuery = productsQuery.sort({ price: 1 });
    if (sort === "price_desc") productsQuery = productsQuery.sort({ price: -1 });
    if (sort === "newest") productsQuery = productsQuery.sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);
    const products = await productsQuery.skip(skip).limit(limitNumber);

    res.json({
      products,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
};
