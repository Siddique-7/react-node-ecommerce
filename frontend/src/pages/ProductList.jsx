import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard'; 
import productsAPI from '../services/productsAPI';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsAPI.getAllProducts()
      .then((res) => setProducts(res.data)) 
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">No products available.</p>
      )}
    </div>
  );
};

export default ProductListPage;
