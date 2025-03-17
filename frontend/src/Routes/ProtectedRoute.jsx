import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userRole = userData?.role; // Ensure `role` exists in userData

  if (!userRole) return <Navigate to="/member/login" replace />;
  if (!allowedRoles.includes(userRole)) return <Navigate to={`/${userRole}/home`} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
