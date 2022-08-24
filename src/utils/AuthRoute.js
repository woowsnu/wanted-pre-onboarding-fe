import { Outlet, Navigate } from "react-router-dom";

const AuthRoute = () => {
  let auth = !!localStorage.getItem("access_token");
  return !auth ? <Outlet /> : <Navigate to="/todo" />;
};

export default AuthRoute;
