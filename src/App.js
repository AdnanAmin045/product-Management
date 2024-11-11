
import './App.css';
import LogIn from './frontend/logIn';
import SignUp from "./frontend/signup"
import Products from './frontend/products';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LogIn />
    },
    {
      path: "/signUp",
      element: <SignUp />
    },
    {
      path: "/products",
      element: <Products />
    },

  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
