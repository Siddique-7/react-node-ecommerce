import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import useCart from '../context/CartContext.jsx';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.countInStock > 0) {
      addToCart(product);
    } else {
      toast.error('Product is out of stock');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group border border-gray-100">
      <Link to={`/products/${product._id}`} className="block">
        {/* Product Image */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={product.image || '/placeholder-image.jpg'}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          {/* Out of Stock Badge */}
          {product.countInStock === 0 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-md shadow-sm">
              Out of Stock
            </div>
          )}

          {/* Wishlist Icon */}
          <button
            type="button"
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Add to Wishlist"
          >
            <FiHeart size={18} className="text-pink-500" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 text-base mb-1 line-clamp-2 group-hover:text-primary-600">
            {product.title}
          </h3>

          {product.category && (
            <p className="text-sm text-gray-400 mb-2">{product.category}</p>
          )}

          {/* Price */}
          <div className="flex items-center mb-3">
            <span className="text-lg font-bold text-green-700">${product.price}</span>
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={product.countInStock === 0}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors duration-300 ${
            product.countInStock === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : isInCart(product._id)
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          <FiShoppingCart size={18} />
          <span>
            {product.countInStock === 0
              ? 'Out of Stock'
              : isInCart(product._id)
              ? 'Added to Cart'
              : 'Add to Cart'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
