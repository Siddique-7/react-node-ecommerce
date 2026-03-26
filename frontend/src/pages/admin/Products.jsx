import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiBox,
} from "react-icons/fi";

import productsAPI from "../../services/productsAPI";
import Loader from "../../components/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productsAPI.getAllProducts();
      setProducts(res.data.products || []);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await productsAPI.deleteProduct(id);
      toast.success("Product deleted");
      fetchProducts(); // refresh
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FiBox /> Products
        </h1>

        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {products.length === 0 ? (
          <div className="p-6 text-gray-500 text-center">
            No products found
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 flex items-center gap-3">
                   <img
                     src={product.image || "/placeholder.png"}
                     alt={product.title}
                     className="w-12 h-12 object-cover rounded-lg border"
                   />
                   <span className="font-medium">{product.title}</span>
                 </td>

                  <td className="p-4">
                    ₹{product.price.toLocaleString()}
                  </td>

                  <td className="p-4 text-right space-x-3">
                    <Link
                      to={`/admin/products/${product._id}`}
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <FiEdit /> Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="inline-flex items-center gap-1 text-red-600 hover:underline"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Products;