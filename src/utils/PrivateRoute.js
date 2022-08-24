import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  let auth = !!localStorage.getItem("access_token");
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
