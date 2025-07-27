import Product from '../models/product.model.js';

// Create product with image URL from Cloudinary
export const createProduct = async (req, res) => {
  try {
    const { title, price, description, category, brand, countInStock } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image upload failed or missing" });
    }

    const product = await Product.create({
      title,
      price,
      description,
      category,
      brand,
      countInStock,
      image: req.file.path, // Already Cloudinary secure_url
      createdBy: req.user._id
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Product creation failed", error: error.message });
  }
};


//  Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch products' });
  }
};

//  Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch product' });
  }
};
