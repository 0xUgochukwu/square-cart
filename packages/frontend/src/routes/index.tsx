/** @format */

import { Outlet } from "react-router-dom";
import Layout from "../pages/auth/Layout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/dashboard/Home";
import Shop from "../pages/dashboard/Shop";
import Orders from "../pages/dashboard/Orders";
import EditProduct from "../pages/dashboard/EditProduct";
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
      {
        path: "/dashboard/orders",
        element: <Orders />,
      },
      {
        path: "/dashboard/edit-product/:id",
        element: <EditProduct />,
      },
    ],
  },
];

export default Routes;
