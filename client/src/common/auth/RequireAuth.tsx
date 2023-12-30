import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../store/auth/authSlice";

export const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to={`/login?redirect=${location.pathname}`} />;
  }
  return <Outlet />;
};
