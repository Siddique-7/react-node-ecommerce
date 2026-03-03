import api from './api';

 const usersAPI = {
  getUserProfile: () => {
    return api.get('/users/profile');
  },

  updateUserProfile: (userData) => {
    return api.put('/users/profile', userData);
  },

  uploadAvatar: (formData) => {
    return api.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  addAddress: (addressData) => {
    return api.post('/users/addresses', addressData);
  },

  getAddresses: () => {
    return api.get('/users/addresses');
  },

  updateAddress: (id, addressData) => {
    return api.put(`/users/addresses/${id}`, addressData);
  },

  deleteAddress: (id) => {
    return api.delete(`/users/addresses/${id}`);
  },

  getWishlist: () => {
    return api.get('/users/wishlist');
  },

  addToWishlist: (productId) => {
    return api.post('/users/wishlist', { productId });
  },

  removeFromWishlist: (productId) => {
    return api.delete(`/users/wishlist/${productId}`);
  },

  getAllUsers: (params = {}) => {
    return api.get('/users/admin/all', { params });
  },

  updateUserRole: (userId, role) => {
    return api.put(`/users/admin/${userId}/role`, { role });
  },

  deleteUser: (userId) => {
    return api.delete(`/users/admin/${userId}`);
  }
};

export default usersAPI