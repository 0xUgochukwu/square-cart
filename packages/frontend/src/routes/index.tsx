/** @format */

import { Outlet } from "react-router-dom";
import Layout from "../pages/auth/Layout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/dashboard/Home";
import Shop from "../pages/dashboard/Shop";
import ProtectedRoute from "./protectedroute";

const Routes = [
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard/home",
        element: <Home />,
      },
      {
        path: "/dashboard/shop",
        element: <Shop />,
      },
    ],
  },
];

export default Routes;
