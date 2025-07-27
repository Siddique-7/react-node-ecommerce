import api from './api';

export const usersAPI = {
  // Get user profile
  getUserProfile: () => {
    return api.get('/users/profile');
  },

  // Update user profile
  updateUserProfile: (userData) => {
    return api.put('/users/profile', userData);
  },

  // Upload user avatar
  uploadAvatar: (formData) => {
    return api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Add user address
  addAddress: (addressData) => {
    return api.post('/users/addresses', addressData);
  },

  // Get user addresses
  getAddresses: () => {
    return api.get('/users/addresses');
  },

  // Update address
  updateAddress: (id, addressData) => {
    return api.put(`/users/addresses/${id}`, addressData);
  },

  // Delete address
  deleteAddress: (id) => {
    return api.delete(`/users/addresses/${id}`);
  },

  // Get user wishlist
  getWishlist: () => {
    return api.get('/users/wishlist');
  },

  // Add to wishlist
  addToWishlist: (productId) => {
    return api.post('/users/wishlist', { productId });
  },

  // Remove from wishlist
  removeFromWishlist: (productId) => {
    return api.delete(`/users/wishlist/${productId}`);
  },

  // Admin: Get all users
  getAllUsers: (params = {}) => {
    return api.get('/users/admin/all', { params });
  },

  // Admin: Update user role
  updateUserRole: (userId, role) => {
    return api.put(`/users/admin/${userId}/role`, { role });
  },

  // Admin: Delete user
  deleteUser: (userId) => {
    return api.delete(`/users/admin/${userId}`);
  }
};