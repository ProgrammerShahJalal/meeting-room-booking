import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isAdmin = useSelector(
    (state: RootState) => state.auth.user?.role === "admin"
  );
  const location = useLocation();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default AdminRoute;
