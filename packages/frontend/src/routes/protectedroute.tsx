/** @format */

import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../services/storage";

const ProtectedRoute = () => {
  const userDataString = getCookie("@user");
  return userDataString ? <Outlet /> : <Navigate to='/' replace />;
};
export default ProtectedRoute;
