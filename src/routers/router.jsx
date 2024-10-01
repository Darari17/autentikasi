// Documentation: https://reactrouter.com/en/main/routers/create-browser-router
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../views/dashboard";
import Login from "../views/login";
import Register from "../views/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // (... add more routers)
]);

export default router;
