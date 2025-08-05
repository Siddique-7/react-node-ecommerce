import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';

function App() {
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
          
          {/* Protected Routes */}
          <Route path="/checkout" element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
          <Route path="/orders" element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          
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