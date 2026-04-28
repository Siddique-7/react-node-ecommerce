import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../context/AuthContext';
import Loader from '../components/Loader';

const AdminRoute = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // ✅ KEY FIX
};

export default AdminRoute;