import { Routes, Route } from 'react-router-dom';

import { useEffect } from 'react';
import { startKeepAlive } from './utils/keepAlive';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Return from './pages/Return';
import Exchange from './pages/Exchange';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import Register from './pages/Register';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import UserOrders from './pages/UserOrders';
import Profile from './pages/Profile';
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import CreateProduct from "./pages/admin/CreateProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import Users from "./pages/admin/Users";

function App() {

  useEffect(() => {
    startKeepAlive(import.meta.env.VITE_API_BASE_URL);
  }, []);

  return (
    
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Outlet */}
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/return" element={<Return />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />    


          
          {/* Protected Routes */}
          <Route path="/checkout" element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
           <Route
  path="/payment"
  element={
    <PrivateRoute>
      <Payment />
    </PrivateRoute>
  }
/>
          <Route path="/orders" element={
            <PrivateRoute>
              <UserOrders />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          
          {/* Admin Routes */}
<Route element={<AdminRoute />}>
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="products" element={<Products />} />
    <Route path="products/new" element={<CreateProduct />} />
    <Route path="orders" element={<AdminOrders />} />
    <Route path="users" element={<Users />} />
  </Route>
</Route>
          
          {/* 404 Page */}
          <Route path="*" element={
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-4">Page not found</p>
                <a href="/" className="btn-primary">Go Home</a>
              </div>
            </div>
          } />
        </Routes>

      </main>
      
      <Footer />
    </div>
  );
}

export default App;