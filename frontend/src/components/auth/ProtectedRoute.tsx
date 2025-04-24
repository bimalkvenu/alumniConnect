// frontend/src/components/auth/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';

type ProtectedRouteProps = {
  children: JSX.Element;
  /**
   * Optional array of allowed roles
   * @example ['student', 'alumni']
   */
  allowedRoles?: ('student' | 'alumni' | 'admin')[];
  /**
   * Optional redirect path when unauthorized
   * @default '/login' for unauthenticated, '/unauthorized' for wrong role
   */
  redirectUnauthenticated?: string;
  redirectUnauthorized?: string;
};

export const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectUnauthenticated = '/',
  redirectUnauthorized = '/unauthorized'
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Show loading indicator while checking auth status
  if (loading) {
    return <LoadingSpinner />;
  }

  // Redirect unauthenticated users
  if (!user) {
    return <Navigate to={redirectUnauthenticated} replace />;
  }

  // Check role permissions if specified
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectUnauthorized} replace />;
  }

  // Render protected content
  return children;
};