import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Dashboard from "../Pages/Dashboard/Dashboard";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [{ path: "/dashboard", element: <Dashboard /> }],
  },
]);

export default Router;
