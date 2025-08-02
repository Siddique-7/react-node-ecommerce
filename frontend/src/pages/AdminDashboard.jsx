import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  FiUsers,
  FiPackage,
  FiShoppingCart,
  FiDollarSign,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiUpload,
} from "react-icons/fi";
import { toast } from "react-toastify";

import productsAPI from "../services/productsAPI";
import ordersAPI from "../services/ordersAPI";
import usersAPI from "../services/usersAPI";
import Loader from "../components/Loader";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Fetch all required data
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        productsAPI.getAllProducts(),
        ordersAPI.getAllOrders(),
        usersAPI.getAllUsers(),
      ]);

      const products = productsRes.data.products || [];
      const orders = ordersRes.data.orders || [];
      const users = usersRes.data.users || [];

      const totalRevenue = orders.reduce(
        (sum, order) => sum + (order.totalAmount || 0),
        0
      );

      setStats({
        totalUsers: users.length,
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="text-white" size={24} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  const sidebarItems = [
    { path: "/admin", label: "Dashboard", icon: FiUsers },
    { path: "/admin/products", label: "Products", icon: FiPackage },
    { path: "/admin/orders", label: "Orders", icon: FiShoppingCart },
    { path: "/admin/users", label: "Users", icon: FiUsers },
  ];

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="p-8">
          <Routes>
            {/* Dashboard Overview */}
            <Route
              path="/"
              element={
                <div>
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                      Dashboard Overview
                    </h1>
                    <p className="text-gray-600 mt-2">
                      Welcome to your admin dashboard
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                      icon={FiUsers}
                      title="Total Users"
                      value={stats.totalUsers.toLocaleString()}
                      color="bg-blue-500"
                    />
                    <StatCard
                      icon={FiPackage}
                      title="Total Products"
                      value={stats.totalProducts.toLocaleString()}
                      color="bg-green-500"
                    />
                    <StatCard
                      icon={FiShoppingCart}
                      title="Total Orders"
                      value={stats.totalOrders.toLocaleString()}
                      color="bg-purple-500"
                    />
                    <StatCard
                      icon={FiDollarSign}
                      title="Total Revenue"
                      value={`$${stats.totalRevenue.toLocaleString()}`}
                      color="bg-orange-500"
                    />
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Link
                        to="/admin/products/new"
                        className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <FiPlus className="mr-2" size={18} />
                        Add Product
                      </Link>
                      <Link
                        to="/admin/orders"
                        className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        <FiEye className="mr-2" size={18} />
                        View Orders
                      </Link>
                      <Link
                        to="/admin/users"
                        className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                      >
                        <FiUsers className="mr-2" size={18} />
                        Manage Users
                      </Link>
                      <button
                        onClick={() => toast.info("Feature coming soon!")}
                        className="flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
                      >
                        <FiUpload className="mr-2" size={18} />
                        Import Data
                      </button>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Recent Activity
                    </h3>
                    <div className="text-gray-600">
                      <p>
                        No recent activity to display. Activity will appear here
                        once you start managing your store.
                      </p>
                    </div>
                  </div>
                </div>
              }
            />

            {/* Products Route Placeholder */}
            <Route
              path="/products"
              element={
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Products Management
                  </h1>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p className="text-gray-600">
                      Products management component will be implemented here.
                    </p>
                  </div>
                </div>
              }
            />

            {/* Orders Route Placeholder */}
            <Route
              path="/orders"
              element={
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Orders Management
                  </h1>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p className="text-gray-600">
                      Orders management component will be implemented here.
                    </p>
                  </div>
                </div>
              }
            />

            {/* Users Route Placeholder */}
            <Route
              path="/users"
              element={
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Users Management
                  </h1>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p className="text-gray-600">
                      Users management component will be implemented here.
                    </p>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
