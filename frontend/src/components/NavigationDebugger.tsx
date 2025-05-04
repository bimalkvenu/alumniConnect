// src/components/NavigationDebugger.tsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const NavigationDebugger = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, pendingNavigation } = useAuth();

  useEffect(() => {
    console.log('--- NAVIGATION DEBUG ---');
    console.log('Current path:', location.pathname);
    console.log('User:', user);
    console.log('Pending navigation:', pendingNavigation);
  }, [location, user, pendingNavigation]);

  return null;
};