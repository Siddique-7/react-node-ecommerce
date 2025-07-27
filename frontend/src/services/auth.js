import api from './api';

export const authAPI = {
  // Register new user
  register: (userData) => {
    return api.post('/auth/register', userData);
  },

  // Login user
  login: (credentials) => {
    return api.post('/auth/login', credentials);
  },

  // // Get user profile
  // getProfile: () => {
  //   return api.get('/auth/profile');
  // },

  // // Update user profile
  // updateProfile: (userData) => {
  //   return api.put('/auth/profile', userData);
  // },

  // // Change password
  // changePassword: (passwordData) => {
  //   return api.put('/auth/change-password', passwordData);
  // },

  // // Forgot password
  // forgotPassword: (email) => {
  //   return api.post('/auth/forgot-password', { email });
  // },

  // // Reset password
  // resetPassword: (token, newPassword) => {
  //   return api.post('/auth/reset-password', { token, newPassword });
  // },

  // // Logout (if backend handles logout)
  // logout: () => {
  //   return api.post('/auth/logout');
  // }
};