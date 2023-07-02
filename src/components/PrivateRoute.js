import { Outlet, Navigate } from "react-router-dom";
import { isLoggedIn } from "../services/AuthenticationSvc";

const PrivateRoute = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
