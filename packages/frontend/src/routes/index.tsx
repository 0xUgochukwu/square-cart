import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const Routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default Routes;