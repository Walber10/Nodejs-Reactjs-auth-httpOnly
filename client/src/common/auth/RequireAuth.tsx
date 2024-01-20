import { Navigate, Outlet } from "react-router-dom";

import { useGetAuthQuery } from "../../services/authService";

export const RequireAuth = () => {
  const { data, isLoading } = useGetAuthQuery();

  console.log(data)

  if (isLoading) return <div>Loading...</div>;
  if (!data?.isAuth) {
    return <Navigate to={`/login?redirect=${location.pathname}`} />;
  }
  return <Outlet />;
};
