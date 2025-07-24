import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded shadow">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
          <p className="text-gray-600">₹{product.price}</p>
          <Link
            to={`/products/${product._id}`}
            className="text-blue-600 hover:underline text-sm mt-1 inline-block"
          >
            View Details →
          </Link>
        </div>
      ))}
    </div>
  );
}
