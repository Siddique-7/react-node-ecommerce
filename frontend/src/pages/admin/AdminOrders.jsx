import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiEye } from "react-icons/fi";

import ordersAPI from "../../services/ordersAPI";
import Loader from "../../components/Loader";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await ordersAPI.getAllOrders();
      setOrders(res.data.orders || []);
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    if (status === "Delivered") return "bg-green-100 text-green-600";
    if (status === "Shipped") return "bg-blue-100 text-blue-600";
    if (status === "Cancelled") return "bg-red-100 text-red-600";
    return "bg-yellow-100 text-yellow-600"; // Pending
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div>
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No orders found
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-4 text-left">Order</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Order ID (shortened) */}
                  <td className="p-4 font-medium">
                    #{order._id.slice(-6)}
                  </td>

                  {/* Total */}
                  <td className="p-4">
                    ₹{order.totalAmount.toLocaleString()}
                  </td>

                  {/* Status Badge */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-4 text-right">
                    <button className="inline-flex items-center gap-1 text-blue-600 hover:underline">
                      <FiEye /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;