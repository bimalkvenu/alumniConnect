// components/AuthInitializer.tsx
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { isInitialized } = useAuth();

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};