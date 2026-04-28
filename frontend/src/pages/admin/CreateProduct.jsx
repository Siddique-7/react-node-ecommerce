import { useState, useRef } from "react";
import { toast } from "react-toastify";
import productsAPI from "../../services/productsAPI";

const CreateProduct = () => {  
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    countInStock: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price) {
      return toast.error("Title and Price are required");
    }

    if (!formData.image) {
      return toast.error("Product image is required");
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("brand", formData.brand);
      data.append("countInStock", formData.countInStock);
      data.append("image", formData.image);

      await productsAPI.createProduct(data);

      toast.success("Product created successfully");

      setFormData({
        title: "",
        price: "",
        description: "",
        category: "",
        brand: "",
        countInStock: "",
        image: null,
      });
    } catch (error) {
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Product</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="countInStock"
            value={formData.countInStock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border p-2 rounded"
          />

          {/* Image Upload */}
<div className="space-y-2">
  <label className="text-sm font-medium">Product Image</label>

  <input
    type="file"
    name="image"
    accept="image/*"
    onChange={handleChange}
    ref={fileInputRef}
    className="w-full border p-2 rounded bg-gray-50"
  />

  {/* Preview */}
  {formData.image && (
    <img
      src={URL.createObjectURL(formData.image)}
      alt="preview"
      className="w-24 h-24 object-cover rounded-lg border mt-2"
    />
  )}
</div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;