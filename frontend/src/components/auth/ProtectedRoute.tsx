import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth'; // Create this hook

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth(); // Hook that checks localStorage for user
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};