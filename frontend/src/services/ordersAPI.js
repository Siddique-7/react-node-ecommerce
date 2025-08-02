import api from './api';

 const ordersAPI = {
  // Create new order
  createOrder: (orderData) => {
    return api.post('/orders', orderData);
  },

  // Get user's orders
  getUserOrders: () => {
    return api.get('/orders/my-orders');
  },

  // Get single order by ID
  getOrderById: (id) => {
    return api.get(`/orders/${id}`);
  },

  // Update order status (for admin)
  updateOrderStatus: (id, status) => {
    return api.put(`/orders/${id}/status`, { status });
  },

  // Cancel order
  cancelOrder: (id) => {
    return api.patch(`/orders/${id}/cancel`);
  },

  // Admin: Get all orders
  getAllOrders: (params = {}) => {
    return api.get('/orders/admin/all', { params });
  },

  // Admin: Get order statistics
  getOrderStats: () => {
    return api.get('/orders/admin/stats');
  },

  // Get order tracking info
  trackOrder: (id) => {
    return api.get(`/orders/${id}/track`);
  },

  // Process payment
  processPayment: (orderData) => {
    return api.post('/orders/payment', orderData);
  },

  // Verify payment
  verifyPayment: (paymentData) => {
    return api.post('/orders/payment/verify', paymentData);
  }
};

export default ordersAPI