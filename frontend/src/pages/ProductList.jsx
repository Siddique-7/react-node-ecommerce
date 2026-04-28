import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard'; 
import productsAPI from '../services/productsAPI';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

    const fetchProducts = (params) => {
    setLoading(true);
    productsAPI.getAllProducts({ ...params, page })
      .then((res) => {
        const data = res.data;
        setProducts(data.products || [])
        setPage(data.page || 1)
        setPages(data.pages || 1)
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  };

 // Debounced Search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPage(1)
      fetchProducts({ search, category, sort, page: 1 });
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Immediate update on category or sort change
  useEffect(() => {
    setPage(1);
    fetchProducts({ search, category, sort, page: 1 });
  }, [category, sort]);

  // Immediate update on page change
  useEffect(() => {
  fetchProducts({ search, category, sort, page });
}, [page]);


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
          <option value="TV">TV</option>
          <option value="Phones">Phones</option>
          <option value="Laptops">Laptops</option>
          <option value="Tablets">Tablets</option>
          <option value="Headphones">Headphones</option>
          <option value="Clothing">Clothing</option>
          <option value="Sports">Sports</option>
          <option value="Gaming">Gaming</option>
          <option value="Smartwatch">Smartwatch</option>
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
     
      {/* Pagination */}
 {pages > 1 && (
  <div className="flex justify-center mt-6 gap-2">
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    >
      Previous
    </button>

    <span className="px-4 py-2 text-white">
      Page {page} of {pages}
    </span>

    <button
      disabled={page === pages}
      onClick={() => setPage(page + 1)}
      className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>    
 )}  
    
  </div>
)}

export default ProductListPage;
