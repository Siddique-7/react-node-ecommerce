import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';

import useAuth from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

try {
      const data = await login(formData); // axios returns response in result

      if (data.code === "LOGIN_SUCCESS") {
      navigate(from || "/", { replace: true });
 } 
    } catch (err) {
    // err is the object I threw from AuthContext

     if (err.code === "USER_NOT_FOUND") {
      toast.error(err.message);
    } else if (err.code === "INVALID_PASSWORD") {
      toast.error(err.message);
    } else {
      toast.error(err.message || "Unexpected error, please try again.");
    }
    }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-800 to-pink-800 text-white px-4 sm:px-6 py-12">
      <div className="max-w-md w-full bg-white/10 p-8 rounded-lg shadow-xl">
        <h2 className="text-center text-3xl font-bold mb-2">Login to your account</h2>
        <p className="text-sm text-center mb-6">
          Or{' '}
          <Link to="/register" className="text-blue-300 hover:text-blue-500 underline">
            create a new account
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-white">
                <FiMail />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 rounded-md border focus:ring-2 focus:outline-none text-black ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm mb-1">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-white">
                <FiLock />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-2 rounded-md border focus:ring-2 focus:outline-none text-black ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-white"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password}</p>}
          </div>

          {/* Remember Me + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 rounded text-primary-600" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-blue-300 hover:text-blue-500 underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center cursor-pointer gap-2 py-3 px-4 rounded-md font-semibold text-white shadow-md transition-transform duration-200 ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
              }`}
            >
              {loading && (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <p className="text-sm text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-300 hover:text-blue-500 underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
