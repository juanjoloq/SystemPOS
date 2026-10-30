import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function PrivateRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return null;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;