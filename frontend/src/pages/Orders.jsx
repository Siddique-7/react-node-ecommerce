import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersAPI } from '../services/orders';
import Loader from '../components/Loader';
import { 
  FiPackage, 
  FiTruck, 
  FiCheck, 
  FiX, 
  FiEye,
  FiClock,
  FiShoppingBag
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getUserOrders();
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <FiClock className="text-yellow-500" size={20} />;
      case 'confirmed':
        return <FiCheck className="text-blue-500" size={20} />;
      case 'shipped':
        return <FiTruck className="text-purple-500" size={20} />;
      case 'delivered':
        return <FiPackage className="text-green-500" size={20} />;
      case 'cancelled':
        return <FiX className="text-red-500" size={20} />;
      default:
        return <FiClock className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await ordersAPI.cancelOrder(orderId);
        toast.success('Order cancelled successfully');
        fetchOrders();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to cancel order');
      }
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <FiShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-8">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Link
            to="/"
            className="btn-primary"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-2">
          Track and manage your orders
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Order Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    ${order.totalAmount?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {order.items?.slice(0, 3).map((item) => (
                  <div key={item._id} className="flex items-center space-x-3">
                    <img
                      src={item.product?.images?.[0] || '/placeholder-image.jpg'}
                      alt={item.product?.name || 'Product'}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.product?.name || 'Product'}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {order.items?.length > 3 && (
                <p className="text-sm text-gray-500 mb-4">
                  +{order.items.length - 3} more items
                </p>
              )}

              {/* Order Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FiEye size={16} />
                  <span>{selectedOrder === order._id ? 'Hide Details' : 'View Details'}</span>
                </button>

                {order.status === 'pending' && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="flex items-center justify-center space-x-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <FiX size={16} />
                    <span>Cancel Order</span>
                  </button>
                )}

                <Link
                  to={`/orders/${order._id}/track`}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <FiTruck size={16} />
                  <span>Track Order</span>
                </Link>
              </div>
            </div>

            {/* Order Details (Collapsible) */}
            {selectedOrder === order._id && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Shipping Address */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Shipping Address
                    </h4>
                    {order.shippingAddress ? (
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="font-medium">{order.shippingAddress.fullName}</p>
                        <p>{order.shippingAddress.address}</p>
                        <p>
                          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                        <p>Phone: {order.shippingAddress.phone}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No shipping address</p>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Order Summary
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span>${(order.totalAmount - (order.shippingCost || 0) - (order.tax || 0)).toFixed(2)}</span>
                      </div>
                      {order.shippingCost > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping:</span>
                          <span>${order.shippingCost.toFixed(2)}</span>
                        </div>
                      )}
                      {order.tax > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax:</span>
                          <span>${order.tax.toFixed(2)}</span>
                        </div>
                      )}
                      <hr className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>${order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items Details */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Items Ordered
                  </h4>
                  <div className="space-y-3">
                    {order.items?.map((item) => (
                      <div key={item._id} className="flex items-center space-x-4 p-3 bg-white rounded-lg">
                        <img
                          src={item.product?.images?.[0] || '/placeholder-image.jpg'}
                          alt={item.product?.name || 'Product'}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">
                            {item.product?.name || 'Product'}
                          </h5>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            ${item.price} each
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Notes */}
                {order.notes && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Order Notes
                    </h4>
                    <p className="text-sm text-gray-600 bg-white p-3 rounded-lg">
                      {order.notes}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;