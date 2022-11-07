import Main from "../../Layout/Main";
import AddProduct from "../../Pages/AddProduct/AddProduct";
import AllProduct from "../../Pages/AllProduct/AllProduct";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Orders from "../../Pages/Orders/Orders";
import Register from "../../Pages/Register/Register";
import PrivateRoute from "../PrivvateRoute/PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/allproduct",
        element: <AllProduct></AllProduct>,
        // loader: () => fetch("https://practice-project-server.vercel.app/products"),
      },
      {
        path: "/addproduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <Orders></Orders>
          </PrivateRoute>
        ),
        // loader: () => fetch("https://practice-project-server.vercel.app/orders"),
      },
      {
        path: "*",
        element: <h1>This page is not found 404</h1>,
      },
    ],
  },
]);

export default router;
