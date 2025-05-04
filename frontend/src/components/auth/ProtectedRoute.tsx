// src/components/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const ProtectedRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const { user, loading, isInitialized } = useAuth();

  console.log('ProtectedRoute check:', {
    path: location.pathname,
    user: user?.role,
    allowedRoles,
    isLoading: loading
  });

  if ( !isInitialized || loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('Redirecting to home - no user');
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role.toLowerCase())) {
    console.log(`Redirecting - role ${user.role} not in ${allowedRoles}`);
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};