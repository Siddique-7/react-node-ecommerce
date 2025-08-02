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
} from "react-icons/fi";
import { toast } from "react-toastify";

import productsAPI from "../services/productsAPI";
import Loader from "../components/Loader";
import useCart from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

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
    if (product.countInStock > 0) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image || "/placeholder-image.jpg"}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            {product.category && (
              <p className="text-gray-600">{product.category}</p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price}
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
              className={`font-medium ${
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
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiMinus size={16} />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.countInStock}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiPlus size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                product.countInStock === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-primary-600 hover:bg-primary-700 text-white"
              }`}
            >
              <FiShoppingCart size={20} />
              <span>
                {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
              </span>
            </button>

            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <FiHeart size={20} />
            </button>
          </div>

          {/* Features */}
          <div className="border-t pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FiTruck className="text-primary-600" size={16} />
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FiShield className="text-primary-600" size={16} />
                <span>1 year warranty</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <FiRefreshCw className="text-primary-600" size={16} />
                <span>30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
