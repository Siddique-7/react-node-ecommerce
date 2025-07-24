import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-2">₹{product.price}</p>
      <button
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        onClick={() => alert("🛒 Add to Cart (coming next)")}
      >
        Add to Cart
      </button>
    </div>
  );
}
