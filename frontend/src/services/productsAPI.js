import api from './api';

const productsAPI = {
  getAllProducts: (params) => api.get('/products', { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (productData) =>
    api.post('/products', productData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

export default productsAPI
