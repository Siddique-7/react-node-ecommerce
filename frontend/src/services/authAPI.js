import api from './api';

const authAPI = {
  register: (formData) => api.post('/auth/register', formData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put("/auth/profile", data),
  changePassword: (data) => api.put("/auth/profile/password", data),
  forgotPassword: (email) => api.post("/auth/forgot-password", {email}),
  resetPassword: (token, data) => api.put(`/auth/reset-password/${token}`, data),
  getAllUsers: () => api.get("/auth/admin/users"),
};

export default authAPI