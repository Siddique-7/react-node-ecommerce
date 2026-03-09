import api from './api';

 const ordersAPI = {
  createOrder: (orderData) => {
    return api.post('/orders', orderData);
  },

  getUserOrders: () => {
    return api.get('/orders/my-orders');
  },

  getOrderById: (id) => {
    return api.get(`/orders/${id}`);
  },

  updateOrderStatus: (id, status) => {
    return api.put(`/orders/${id}/status`, { status });
  },

  cancelOrder: (id) => {
    return api.patch(`/orders/${id}/cancel`);
  },

  getAllOrders: (params = {}) => {
    return api.get('/orders/admin/all', { params });
  },

  getOrderStats: () => {
    return api.get('/orders/admin/stats');
  },

  trackOrder: (id) => {
    return api.get(`/orders/${id}/track`);
  },

  processPayment: (orderData) => {
    return api.post('/orders/payment', orderData);
  },

  verifyPayment: (paymentData) => {
    return api.post('/orders/payment/verify', paymentData);
  }
};

export default ordersAPI