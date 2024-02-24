import { Navigate, useLocation, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

interface FilterRouteProps {
  isClosed?: boolean;
}

export default function FilterRoute({ isClosed = false }: FilterRouteProps) {
  const cookies = new Cookies();
  const location = useLocation();
  const loginStatus = cookies.get('loginStatus');

  if (isClosed && !loginStatus) {
    return <Navigate to="/entrar" state={{ from: location}} replace />;
  }

  if (!isClosed && loginStatus) {
    return <Navigate to="/" state={{ from: location}} replace />;
  }

  return <Outlet />;
}