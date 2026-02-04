import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';
import { setAuthToken, removeAuthToken, getAuthToken, getUserFromToken } from '../utils/helpers';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = getAuthToken();
    if (token) {
      const userData = getUserFromToken(token);
      if (userData) {
        // Fetch full user data
        authApi.getCurrentUser()
          .then((data) => {
            setUser(data);
          })
          .catch(() => {
            removeAuthToken();
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      
      if (response.success && response.accessToken) {
        setAuthToken(response.accessToken);
        
        // Fetch user data
        const userData = await authApi.getCurrentUser();
        setUser(userData);
        
        toast.success('Login successful!');
        return { success: true };
      } else {
        toast.error(response.message || 'Login failed');
        return { success: false, message: response.message };
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
      return { success: false, message: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await authApi.signup(userData);
      
      if (response.success && response.accessToken) {
        setAuthToken(response.accessToken);
        
        // Fetch user data
        const user = await authApi.getCurrentUser();
        setUser(user);
        
        toast.success('Account created successfully!');
        return { success: true };
      } else {
        toast.error(response.message || 'Signup failed');
        return { success: false, message: response.message };
      }
    } catch (error) {
      toast.error(error.message || 'Signup failed');
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    toast.info('Logged out successfully');
  };

  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAdmin,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
