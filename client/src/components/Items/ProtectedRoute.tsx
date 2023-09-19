import { RouteProps, Navigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/hooks';

const ProtectedRoute = ({ element, ...rest }: { element: React.ReactNode } & RouteProps) => {
  const isAuthenticatedUser = useAppSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticatedUser);

  if (!isAuthenticatedUser) {
    alert('로그인 후 이용하실 수 있습니다. 로그인 페이지로 이동합니다.');
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
