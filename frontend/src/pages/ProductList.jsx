import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard'; 
import productsAPI from '../services/productsAPI';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

    const fetchProducts = (params) => {
    setLoading(true);
    productsAPI.getAllProducts(params)
      .then((res) => setProducts(res.data || []))
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  };

 // 1️⃣ Debounced Search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts({ search, category, sort });
    }, 400);

    return () => clearTimeout(delayDebounce);

  }, [search]); // only debounce search

  // 2️⃣ Immediate update on category or sort change
  useEffect(() => {
    fetchProducts({ search, category, sort });
  }, [category, sort]);


return (
    <div className="p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 min-h-screen">
      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 rounded border border-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="p-2 rounded border border-gray-300"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Accessories">Accessories</option>
        </select>

        {/* Sort */}
        <select
          className="p-2 rounded border border-gray-300"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>

      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-200">
            No products found.
          </p>
        )}
      </div>
    </div>
  );

};

export default ProductListPage;
