import { useState, useEffect } from 'react';
import { User } from '../types/api';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user data', error);
      }
    }
    setLoading(false);
  }, []);

  const updateUser = (newUserData: User | null) => {
    setUser(newUserData);
    if (newUserData) {
      localStorage.setItem('user', JSON.stringify(newUserData));
    } else {
      localStorage.removeItem('user');
    }
  };

  return { 
    user, 
    loading, 
    setUser: updateUser 
  };
};