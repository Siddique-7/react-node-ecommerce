import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useCart from "../context/CartContext";
import ordersAPI from "../services/ordersAPI";

const Payment = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const { shippingAddress, totalAmount } = location.state || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (!shippingAddress || !totalAmount) {
    toast.error("No order information found");
    navigate("/checkout");
  }
}, [shippingAddress, totalAmount, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    try {
    const orderData = {
    orderItems: items.map(i => ({
    product: i._id,
    quantity: i.quantity,
    price: i.price
   })),
   shippingAddress,
   paymentMethod: "UPI",
   paymentStatus: "Paid",
   totalAmount
 };
      const res = await ordersAPI.createOrder(orderData);
      clearCart();
      toast.success("Order placed successfully");
      navigate(`/orders`);
    } catch (error) {
      toast.error("Payment failed");
    } finally {
    setLoading(false);
  }
  };

  return (

    <div className="max-w-md mx-auto py-10 px-4">
    <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">UPI Payment</h1>
    <div className="bg-white shadow-xl rounded-3xl p-2 flex flex-col items-center">
    <p className="text-lg font-medium mb-2 text-gray-600">Scan QR to Pay</p>

    <div className="bg-gray-50 p-2 rounded-xl shadow-inner mb-2">
      <img
        src="upi-qr.jpeg"
        alt="UPI QR"
        className="w-100 h-100 object-contain p-2"
      />
    </div>

    <p className="text-xl font-semibold mb-1 text-gray-800">Amount: ₹{totalAmount.toFixed(2)}</p>
    <p className="text-lg font-medium text-gray-700 mb-2">UPI ID: <span className="font-bold">9336620815@ptsbi</span></p>
    <p className="text-sm text-gray-500 mb-6 text-center">
      After payment, click the button below to complete your order.
    </p>

<button
  onClick={handlePayment}
  disabled={loading}
  className={`w-full bg-green-600 hover:bg-green-700 transition-all text-white font-semibold py-4 rounded-xl text-lg shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
>
  {loading ? "Processing..." : "I Have Paid"}
</button>

  </div>
</div>

  );
};

export default Payment;