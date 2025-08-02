import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCreditCard, FiUser, FiMapPin, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";

import useAuth from "../context/AuthContext";
import useCart from "../context/CartContext";
import ordersAPI from "../services/ordersAPI";

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Shipping Address
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",

    // Payment Info
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",

    // Order Notes
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
      "cardNumber",
      "expiryDate",
      "cvv",
      "cardHolderName",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Phone validation
    if (
      formData.phone &&
      !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Card number validation (basic)
    if (
      formData.cardNumber &&
      formData.cardNumber.replace(/\s/g, "").length < 16
    ) {
      newErrors.cardNumber = "Please enter a valid card number";
    }

    // Expiry date validation
    if (
      formData.expiryDate &&
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)
    ) {
      newErrors.expiryDate = "Please enter expiry date in MM/YY format";
    }

    // CVV validation
    if (formData.cvv && (formData.cvv.length < 3 || formData.cvv.length > 4)) {
      newErrors.cvv = "Please enter a valid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    const subtotal = getCartTotal();
    const shipping = subtotal >= 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    return subtotal + shipping + tax;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        items: items.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          phone: formData.phone,
        },
        paymentMethod: "card",
        totalAmount: calculateTotal(),
        notes: formData.notes,
      };

      const response = await ordersAPI.createOrder(orderData);

      toast.success("Order placed successfully!");
      clearCart();
      navigate(`/orders/${response.data.order._id}`);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <FiMapPin className="text-primary-600 mr-2" size={20} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Shipping Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`input-field ${
                      errors.fullName ? "border-red-300" : ""
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field ${
                      errors.email ? "border-red-300" : ""
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`input-field ${
                      errors.phone ? "border-red-300" : ""
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`input-field ${
                      errors.address ? "border-red-300" : ""
                    }`}
                    placeholder="Enter your street address"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`input-field ${
                      errors.city ? "border-red-300" : ""
                    }`}
                    placeholder="Enter your city"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`input-field ${
                      errors.state ? "border-red-300" : ""
                    }`}
                    placeholder="Enter your state"
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`input-field ${
                      errors.zipCode ? "border-red-300" : ""
                    }`}
                    placeholder="Enter ZIP code"
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.zipCode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <FiCreditCard className="text-primary-600 mr-2" size={20} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Information
                </h2>
                <FiLock className="text-gray-400 ml-2" size={16} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Holder Name *
                  </label>
                  <input
                    type="text"
                    name="cardHolderName"
                    value={formData.cardHolderName}
                    onChange={handleChange}
                    className={`input-field ${
                      errors.cardHolderName ? "border-red-300" : ""
                    }`}
                    placeholder="Name on card"
                  />
                  {errors.cardHolderName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cardHolderName}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className={`input-field ${
                      errors.cardNumber ? "border-red-300" : ""
                    }`}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className={`input-field ${
                      errors.expiryDate ? "border-red-300" : ""
                    }`}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className={`input-field ${
                      errors.cvv ? "border-red-300" : ""
                    }`}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Notes (Optional)
              </h2>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="input-field"
                placeholder="Any special instructions for your order..."
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item._id} className="flex items-center space-x-3">
                    <img
                      src={item.images?.[0] || "/placeholder-image.jpg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <hr className="mb-4" />

              {/* Price Breakdown */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{getCartTotal() >= 50 ? "Free" : "$9.99"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors duration-200 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Place Order - ${calculateTotal().toFixed(2)}`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
