import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { toast } from "react-toastify";

import authAPI from "../services/authAPI";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    try {
      setLoading(true);
      const res = await authAPI.forgotPassword( email );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-800 to-pink-800 text-white px-4">
      <div className="max-w-md w-full bg-white/10 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-4">
          Forgot Password
        </h2>
        <p className="text-sm text-center mb-6">
          Enter your email to receive a reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-white">
                <FiMail />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-md border text-black"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold transition ${
              loading
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;