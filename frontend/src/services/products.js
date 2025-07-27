import api from './api';

export const productsAPI = {
  // Get all products with optional filters
  getAllProducts: (params = {}) => {
    return api.get('/products', { params });
  },

  // Get single product by ID
  getProductById: (id) => {
    return api.get(`/products/${id}`);
  },

  // // Search products
  // searchProducts: (query) => {
  //   return api.get(`/products/search?q=${encodeURIComponent(query)}`);
  // },

  // // Get products by category
  // getProductsByCategory: (category) => {
  //   return api.get(`/products/category/${category}`);
  // },

  // // Get featured products
  // getFeaturedProducts: () => {
  //   return api.get('/products/featured');
  // },

  // Admin: Create new product
  createProduct: (productData) => {
    return api.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // // Admin: Update product
  // updateProduct: (id, productData) => {
  //   return api.put(`/products/${id}`, productData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });
  // },

  // // Admin: Delete product
  // deleteProduct: (id) => {
  //   return api.delete(`/products/${id}`);
  // },

  // // Get product categories
  // getCategories: () => {
  //   return api.get('/products/categories');
  // },

  // // Add product review
  // addReview: (productId, reviewData) => {
  //   return api.post(`/products/${productId}/reviews`, reviewData);
  // },

  // // Get product reviews
  // getReviews: (productId) => {
  //   return api.get(`/products/${productId}/reviews`);
  // }
};