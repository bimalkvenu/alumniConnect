// src/components/auth/AuthHandler.tsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const AuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, pendingNavigation, isInitialized } = useAuth();

  useEffect(() => {
    if (isInitialized && pendingNavigation && user) {
      const timer = setTimeout(() => {
        navigate(pendingNavigation, { replace: true });
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [user, pendingNavigation, navigate, isInitialized]);

  return null;
};