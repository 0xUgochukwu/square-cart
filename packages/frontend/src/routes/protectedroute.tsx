/** @format */

import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../services/storage";
import Layout from "../pages/dashboard/Layout";

const ProtectedRoute = () => {
  const userDataString = getCookie("@user");
  return userDataString ? (
    <Layout>
      <Outlet />{" "}
    </Layout>
  ) : (
    <Navigate to='/' replace />
  );
};
export default ProtectedRoute;
