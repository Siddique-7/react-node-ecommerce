import api from './api';

const productsAPI = {
  
  getAllProducts: (params = {}) => {
    return api.get('/products', { params });  
  },

  getProductById: (id) => {
    return api.get(`/products/${id}`);  
  },

  createProduct: (productData) => {
    return api.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

export default productsAPI
