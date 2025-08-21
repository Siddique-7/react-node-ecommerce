import api from './api';

const authAPI = {
  register: (formData) => api.post('/auth/register', formData),
  login: (credentials) => api.post('/auth/login', credentials), //Axios POST request
  getProfile: () => api.get('/auth/profile'),
};

export default authAPI