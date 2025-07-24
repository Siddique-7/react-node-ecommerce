import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/">🛒 E-Shop</Link>
      </div>

      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/cart" className="hover:underline">Cart</Link>
        {user && <Link to="/orders" className="hover:underline">Orders</Link>}
        {user?.isAdmin && (
          <Link to="/admin" className="hover:underline">Admin</Link>
        )}
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <span className="text-sm">Hi, {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-600 px-2 py-1 rounded hover:bg-red-700 text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
