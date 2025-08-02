import api from './api';

const productsAPI = {
  // Get all products (with optional filters like sort, limit, etc.)
  getAllProducts: (params = {}) => {
    return api.get('/products', { params });  // maps to GET /api/products
  },

  // Get single product by ID (e.g., /api/products/123)
  getProductById: (id) => {
    return api.get(`/products/${id}`);  // maps to GET /api/products/:id
  },

  // Create (Post) new product (e.g., POST /api/products)
  createProduct: (productData) => {
    return api.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

export default productsAPI
