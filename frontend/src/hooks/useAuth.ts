import { useState, useEffect } from 'react';
import { User } from '../types/api';
import api from '../api';
import { useNavigate } from 'react-router-dom';

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          // Verify token with backend
          const response = await api.get('/auth/me');
          if (response.data?.success) {
            setUser(response.data.data);
          } else {
            logout();
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      
      if (response.data.success && response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        
        // Return the redirect path based on role
        return {
          student: '/student-portal',
          alumni: '/alumni-portal',
          admin: '/admin-dashboard'
        }[response.data.user.role] || '/';
      }
      throw new Error(response.data.error || 'Login failed');
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    registrationNumber: string;
    year: string;
    section: string;
    program: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<AuthResponse>('/auth/register', {
        ...userData,
        role: 'student' // Explicitly set role
      });
      
      if (response.data.success && response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        return '/student-portal';
      }
      throw new Error(response.data.error || 'Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const updateUser = async (userData: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put('/auth/me', userData);
      
      if (response.data?.success) {
        const updatedUser = { ...user, ...response.data.data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        throw new Error(response.data?.error || 'Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);
      setError(error instanceof Error ? error.message : 'Update failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { 
    user, 
    setUser,
    loading, 
    error,
    login,
    register,
    logout,
    updateUser
  };
};