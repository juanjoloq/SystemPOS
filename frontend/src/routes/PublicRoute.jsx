import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

function PublicRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return null;

  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
}

export default PublicRoute;