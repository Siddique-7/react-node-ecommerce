import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiShoppingCart } from 'react-icons/fi';
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
    <div className="bg-slate-300 text-black rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group border">
      <Link to={`/products/${product._id}`} className="block">

        {/* Product Image */}
        <div className="relative h-70 overflow-hidden bg-gray-100">
          <img
            src={product.image || '/placeholder-image.jpg'}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"           
          />

          {/* Out of Stock Badge */}
          {product.countInStock === 0 && (
            <div className="absolute top-2 left-2 bg-red-600 px-2 py-1 text-xs font-semibold rounded-md shadow-sm">
              Out of Stock
            </div>
          )}

        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-base mb-1 line-clamp-2 group-hover:text-primary-600">
            {product.title}
          </h3>

          {product.category && (
            <p className="text-sm mb-2">{product.category}</p>
          )}

          {/* Price */}
          <div className="flex items-center mb-3">
            <span className="text-lg font-bold text-green-600">${product.price}</span>
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-sm line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
      </Link>

{/* Add to Cart Button */}
<div className="p-4 pt-0">
  <button
    onClick={handleAddToCart}
    disabled={product.countInStock === 0 || isInCart(product._id)}
    aria-label={
      product.countInStock === 0 
        ? 'Product out of stock' 
        : isInCart(product._id) 
          ? 'Product already in cart' 
          : `Add ${product.name} to cart`
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
          : <span className='cursor-pointer'> Add to Cart </span>
      }
    </span>
    
    {/* Stock indicator for low stock */}
    {/* {product.countInStock > 0 && product.countInStock <= 5 && !isInCart(product._id) && (
      <span className="ml-1 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
        Only {product.countInStock} left
      </span>
    )} */}
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
    </div>
  );
};

export default ProductCard;
