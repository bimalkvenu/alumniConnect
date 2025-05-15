import { useState, useEffect, useCallback } from 'react';
import { User } from '../types/api';
import api from '../api';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const initializeAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      setLoading(false);
      setIsInitialized(true);
      return;
    }

    try {
      // Try to verify with backend first
      const response = await api.get('/auth/me');
      let userData = response.data?.user || response.data?.data?.user || response.data;

      // If response is just an ID, use stored data
      if (typeof userData === 'string') {
        console.warn('Backend returned ID only, using stored data');
        userData = JSON.parse(storedUser);
      }

      // Ensure we have a proper user object
      if (!userData || typeof userData !== 'object') {
        throw new Error('Invalid user data received');
      }

        // Ensure role exists
        if (!userData.role) {
          console.warn('Backend response missing role, checking stored data');
          const parsedStored = JSON.parse(storedUser);
          if (parsedStored.role) {
            userData.role = parsedStored.role;
          } else {
            throw new Error('Role missing in both backend and stored data');
          }
        }

        const normalizedUser = {
          ...userData,
          role: userData.role.toLowerCase(),
          id: userData.id || userData._id
        };

        setUser(normalizedUser);
        localStorage.setItem('user', JSON.stringify(normalizedUser));
    } catch (error) {
      console.warn('Auth verification failed, using stored data:', error);
    }

    // Fallback to stored user data if API fails
    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.role) {
        setUser(parsedUser);
      } else {
        throw new Error('Stored user data incomplete');
      }
    } catch (error) {
      console.error('Invalid stored user data:', error);
      logout();
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  }, [logout]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.token && response.data.user) {
        const userData = {
          ...response.data.user,
          role: response.data.user.role?.toLowerCase() || 'student'
        };
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return true;
      }
      throw new Error('Invalid response from server');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, isInitialized, login, logout };
};