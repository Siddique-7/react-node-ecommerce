import { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';


import  authAPI  from '../services/authAPI';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {

    case 'LOGIN_START':
      return { ...state, loading: true, error: null };

    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null
      };

    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload, isAuthenticated: false };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };

    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const token = localStorage.getItem('token');

const initialState = {
  user: null,
  token,
  isAuthenticated: !!token,
  loading: false,
  error: null
};

 export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user on app start if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    }
  }, []);

  const loadUser = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authAPI.getProfile();
      dispatch({
        type: 'LOAD_USER',
        payload: {
          user: response.data.user,
          token: localStorage.getItem('token')
        }
      });
    } catch (error) {
      console.error('Failed to load user:', error);
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: 'LOGIN_START' });
      const response = await authAPI.login(credentials);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: response.data.token
        }
      });
      
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
  try {
    const response = await authAPI.register(userData);
    toast.success('Registration successful!');
    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Registration failed';
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};


  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully!');
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
    loadUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

 const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth