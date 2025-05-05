import { useState, useEffect } from 'react';
import { User } from '../types/api';
import api from '../api';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          const response = await api.get('/auth/me');
          
          // Handle different response structures
          const userData = response.data.user || response.data.data?.user;
          
          if (!userData) {
            throw new Error('No user data received');
          }

          // Ensure role exists and is lowercase
          if (!userData.role) {
            throw new Error('User role missing');
          }
          
          const normalizedUser = {
            ...userData,
            role: userData.role.toLowerCase()
          };
    
          setUser(normalizedUser);
          localStorage.setItem('user', JSON.stringify(normalizedUser));
        } catch (error) {
          console.error('Auth verification failed:', error);
          logout();
        }
      }
      setLoading(false);
      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        return true;
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return { 
    user,
    loading,
    isInitialized,
    login,
    logout, };
};