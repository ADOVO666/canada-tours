import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, redirectPath = '/', requireAdmin = false }) => {
  const token = localStorage.getItem('accessToken');
  
  // Проверяем наличие токена
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  try {
    // Декодируем токен для проверки срока действия
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp < Date.now() / 1000;

    if (isExpired) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return <Navigate to={redirectPath} replace />;
    }

    // Дополнительная проверка на админа, если требуется
    if (requireAdmin && !decoded.is_admin) {
      return <Navigate to="/not-authorized" replace />;
    }

    return children ? children : <Outlet />;
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return <Navigate to={redirectPath} replace />;
  }
};

export default ProtectedRoute;