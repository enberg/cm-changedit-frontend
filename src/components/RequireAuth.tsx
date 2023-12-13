import { Navigate, Outlet } from "react-router-dom";
import auth from "../lib/auth";

const RequireAuth = () => {
  if (!auth.isSignedIn()) {
    return <Navigate to='/sign-in' replace />;
  }

  return  <Outlet />;
};

export default RequireAuth;