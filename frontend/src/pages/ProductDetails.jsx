import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiMinus,
  FiPlus,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiX,
  FiCheck,
} from "react-icons/fi";
import { toast } from "react-toastify";


import useAuth from '../context/AuthContext.jsx'; 
import productsAPI from "../services/productsAPI";
import Loader from "../components/Loader";
import useCart from "../context/CartContext";



const ProductDetails = () => {
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInCart } = useCart(); // Assuming isInCart is also available from your CartContext

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {

    if (!isAuthenticated) {
    toast.info("Please login to add items to cart");
    navigate("/login");
    return;
  }
    if (product.countInStock > 0) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      toast.success("Added to cart!");
    } else {
      toast.error("Product is out of stock");
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.countInStock) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <button onClick={() => navigate("/")} className="btn-primary">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src={product.image || "/placeholder-image.jpg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white p-8 rounded-xl shadow-lg space-y-8">
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase mb-2">
                {product.category || "Category"}
              </p>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                {product.title}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-extrabold text-primary-600">
                ₹{product.price}
              </span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.countInStock > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span
                className={`font-semibold ${
                  product.countInStock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.countInStock > 0
                  ? `${product.countInStock} in stock`
                  : "Out of stock"}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Quantity Selector */}
            {product.countInStock > 0 && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-3 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiMinus size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium text-gray-900">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.countInStock}
                    className="p-3 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
              </div>
            )}
             {/* Add to Cart Button - UPDATED */}
            <div className="p-4 pt-0">
              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0 || isInCart(product._id)}
                aria-label={
                  product.countInStock === 0 
                    ? 'Product out of stock' 
                    : isInCart(product._id) 
                      ? 'Product already in cart' 
                      : `Add ${product.title} to cart`
                }
                className={`
                  w-full flex items-center justify-center gap-2 py-3 px-4 
                  rounded-lg font-medium transition-all duration-300 
                  transform hover:scale-105 active:scale-95
                  ${product.countInStock === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : isInCart(product._id)
                      ? 'bg-green-700 text-white hover:bg-green-800' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                  }
                `}
              >
                {/* Dynamic Icon */}
                {product.countInStock === 0 ? (
                  <FiX size={18} />
                ) : isInCart(product._id) ? (
                  <FiCheck size={18} />
                ) : (
                  <FiShoppingCart size={18} />
                )}
                
                {/* Dynamic Text */}
                <span className="text-sm font-semibold">
                  {product.countInStock === 0
                    ? 'Out of Stock'
                    : isInCart(product._id)
                      ? 'In Cart'
                      : 'Add to Cart'
                  }
                </span>
              </button>
              
              {/* Optional: Stock status below button */}
              {product.countInStock > 0 && product.countInStock <= 10 && (
                <p className="text-center text-sm text-gray-600 mt-2">
                  {product.countInStock <= 5 
                    ? `Hurry! Only ${product.countInStock} items left` 
                    : `${product.countInStock} items available`
                  }
                </p>
              )}
            </div>
            {/* Features */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FiTruck className="text-primary-600" size={16} />
                  <span>Free shipping over ₹200</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FiShield className="text-primary-600" size={16} />
                  <span>1 year warranty</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FiRefreshCw className="text-primary-600" size={16} />
                  <span>15-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;