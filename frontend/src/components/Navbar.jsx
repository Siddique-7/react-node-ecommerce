import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
  FiSettings,
  FiPackage
} from 'react-icons/fi';

import useAuth from '../context/AuthContext';
import useCart from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold ">MERN Shop</span>
          </Link>

          {/* Navigation Tabs - Desktop */}
          <div className="hidden md:flex space-x-15 ml-8">
            <Link
              to="/"
              className=" hover:text-primary-600 font-medium transition"
            >
              Home
            </Link>

            <Link
              to="/products"
              className=" hover:text-primary-600 font-medium transition"
            >
              Shop
            </Link>
            
            <Link
              to="/about"
              className=" hover:text-primary-600 font-medium transition"
            >
              About
            </Link>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart */}
<button
  onClick={() => {
    isAuthenticated ? navigate('/cart') : navigate('/login');
  }}
  className="relative p-2 hover:text-primary-600 transition cursor-pointer"
>
  <FiShoppingCart size={22} />
</button>


            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">

                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:text-primary-600 transition cursor-pointer"
                >
                  <FiUser size={22} />
                  <span className="hidden lg:block">{user?.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-50">
                    <Link
                      to="/orders"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FiPackage className="mr-3" size={16} />
                      My Orders
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FiSettings className="mr-3" size={16} />
                      Profile
                    </Link>                  
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FiSettings className="mr-3" size={16} />
                        Admin Dashboard
                      </Link>
                    )}
                    
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiLogOut className="mr-3" size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (    // conditional rendering on auth
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className=" hover:text-primary-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary-600 transition"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pt-3 pb-4 border-t border-gray-200 space-y-2">
            {/* Mobile Nav Links */}
            <Link
              to="/"
              className="block text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            {/* Mobile Cart */}
            <Link
              to="/cart"
              className="flex items-center justify-between px-1 py-2 text-base font-medium text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FiShoppingCart className="mr-2" size={20} />
                Cart
              </div>
              {getCartItemsCount() > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {/* Mobile User Actions */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/orders"
                  className="flex items-center py-2 text-base text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiPackage className="mr-2" size={20} />
                  My Orders
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center py-2 text-base text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiSettings className="mr-2" size={20} />
                  Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center py-2 text-base text-gray-700 hover:text-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiSettings className="mr-2" size={20} />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full py-2 text-base text-gray-700 hover:text-primary-600"
                >
                  <FiLogOut className="mr-2" size={20} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-base text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-base text-white bg-primary-600 hover:bg-primary-700 rounded-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
