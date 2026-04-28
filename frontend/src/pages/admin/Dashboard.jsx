import { useState, useEffect } from "react";
import {
  FiUsers,
  FiPackage,
  FiShoppingCart,
  FiDollarSign,
  FiPlus,
  FiEye,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import authAPI from "../../services/authAPI";
import productsAPI from "../../services/productsAPI";
import ordersAPI from "../../services/ordersAPI";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      const [productsRes, ordersRes, usersRes] = await Promise.allSettled([
        productsAPI.getAllProducts(),
        ordersAPI.getAllOrders(),
        authAPI.getAllUsers(),
      ]);

      const products =
        productsRes.status === "fulfilled"
          ? productsRes.value.data.products
          : [];

      const orders =
        ordersRes.status === "fulfilled"
          ? ordersRes.value.data.orders
          : [];

      const users =
        usersRes.status === "fulfilled"
          ? usersRes.value.data.users
          : [];

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
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div>
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Users */}
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
          </div>
          <FiUsers className="text-blue-500 text-3xl" />
        </div>

        {/* Products */}
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Products</p>
            <h2 className="text-2xl font-bold">{stats.totalProducts}</h2>
          </div>
          <FiPackage className="text-green-500 text-3xl" />
        </div>

        {/* Orders */}
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Orders</p>
            <h2 className="text-2xl font-bold">{stats.totalOrders}</h2>
          </div>
          <FiShoppingCart className="text-purple-500 text-3xl" />
        </div>

        {/* Revenue */}
        <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Revenue</p>
            <h2 className="text-2xl font-bold">
              ₹{stats.totalRevenue.toLocaleString()}
            </h2>
          </div>
          <FiDollarSign className="text-yellow-500 text-3xl" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-10">
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Product
        </Link>

        <Link
          to="/admin/orders"
          className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg shadow hover:bg-gray-900 transition"
        >
          <FiEye /> View Orders
        </Link>
      </div>

      {/* Placeholder Section (Future Upgrade) */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-500">
          Charts and recent activity will appear here (next upgrade 🚀)
        </p>
      </div>
    </div>
  );
};

export default Dashboard;