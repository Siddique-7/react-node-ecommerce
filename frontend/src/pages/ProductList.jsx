import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard'; 
import productsAPI from '../services/productsAPI';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsAPI.getAllProducts()
      .then((res) => setProducts(res.data || [])) 
      .catch((err) => console.error('Error fetching products:', err))
      .finally(() => setLoading(false))
  }, []);

   if(loading){
      return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
 {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">No products available at the moment.</p>
      )}
    </div>
  );
};

export default ProductListPage;
