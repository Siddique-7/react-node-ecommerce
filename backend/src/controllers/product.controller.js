import Product from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



// #- Create product without cloudinary

export const createProduct = async (req, res) => {
  const { title, price, description, category, brand, countInStock } = req.body;

  // multer puts uploaded file info on req.file
  const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

  if (!imagePath) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    const product = await Product.create({
      title,
      price,
      description,
      category,
      brand,
      countInStock,
      image: imagePath, // Save local image path (e.g. uploads/...)
      createdBy: req.user._id
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Product creation failed", error: error.message });
  }
};



// #- Create product with cloudinary

// export const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, stock } = req.body;
//     const imageLocalPath = req.file?.path;

//     if (!imageLocalPath) return res.status(400).json({ msg: "No image uploaded" });

//     const imageUpload = await uploadOnCloudinary(imageLocalPath);

//     const product = await Product.create({
//       name,
//       description,
//       price,
//       stock,
//       imageUrl: imageUpload.secure_url
//     });

//     res.status(201).json({ product });
//   } catch (error) {
//     res.status(500).json({ error: "Product creation failed" });
//   }
// };

// Get all products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get single product
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};
