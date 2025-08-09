import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowRight, FiUserPlus, FiShoppingBag,FiHeadphones, FiStar} from "react-icons/fi";
import { toast } from "react-toastify";


import  productsAPI  from "../services/productsAPI.js";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Hero from "../components/Hero.jsx";

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await productsAPI.getAllProducts({
        sort: "-createdAt",
        limit: 12,
      });

      console.log("Products Response:", response.data);
      setProducts(response.data.products || response.data || []); 
      // FIXED: Handle different response formats
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
      // FIXED: Don't let error prevent page from rendering
      setProducts([]); // Set empty array instead of leaving undefined
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Show loader only for initial loading
  if (loading) {
    return <Loader fullScreen />;
  }


  return (
    <div className="min-h-screen">
      
      {/* 1- Hero Section */}
       <Hero />     

      {/* 2- Products Section - Shows message if no products */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Our Products
              </h2>
              <p>Browse our latest additions</p>
            </div>
            

            <Link
              to="/products"
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold"
            >
              <span>View All</span>
              <FiArrowRight />
            </Link>
          </div>

          {/*  FIXED: Handle both cases - with products and without */}
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              <div className="text-center mt-8 md:hidden">
                
                <Link
                  to="/products"
                  className="inline-flex items-center space-x-2 btn-primary"
                >
                  <span>View All Products</span>
                  <FiArrowRight />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className=" text-lg mb-4">
                No products available at the moment
              </p>
              </div>
          )}
            
<div className="text-center mt-8">
  <Link
    to="/products"
    className="inline-flex items-center space-x-2 btn-primary"
  >
    <span>View All Products</span>
    <FiArrowRight />
  </Link>
</div>

        </div>
      </section>

      {/* 3- CTA Section */}
            <section className="relative py-20 bg-indigo-800 text-white overflow-hidden">
      {/* Static Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Trust Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
          <FiStar className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium">Join 50K+ Happy Customers</span>
        </div>

        {/* Main Heading - Matching Hero Typography */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
          Ready to Start Shopping?
        </h2>

        {/* Subtitle - Matching Hero Style */}
        <p className="text-4xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Join thousands of satisfied customers and discover amazing products
          with fast delivery and excellent customer service.
        </p>

        {/* CTA Buttons - Enhanced to Match Hero */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button 
          onClick={() => navigate('/register')}
          className="cursor-pointer group relative inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <FiUserPlus className="w-5 h-5" />
            <span>Create Account</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button 
          onClick={() => navigate('/products')}
          className="cursor-pointer group inline-flex items-center space-x-3 border-2 border-white/30 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
            <FiShoppingBag className="w-5 h-5" />
            <span>Browse Products</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Additional Trust Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-2xl font-bold mb-2 text-blue-400">24/7</div>
            <div className="text-sm text-gray-300">
              Customer Support
              </div>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-2xl font-bold mb-2 text-purple-400">Free</div>
            <div className="text-sm text-gray-300">Shipping Over ₹200</div>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-2xl font-bold mb-2 text-pink-400">7-Day</div>
            <div className="text-sm text-gray-300">Money Back Guarantee</div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade - Matching Hero */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent"></div>

      <style jsx>{`
        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(0.25rem);
        }
        
        .group:hover .group-hover\\:opacity-100 {
          opacity: 1;
        }
      `}</style>
      
    </section>

    </div>
  );
};

export default Home;
