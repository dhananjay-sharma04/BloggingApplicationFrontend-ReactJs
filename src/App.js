import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/user_route/UserDashboard";
import { ProfileInfo } from "./pages/user_route/ProfileInfo";
import PostPage from "./pages/PostPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/services",
    element: <Services />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/posts/:id",
    element: <PostPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/user",
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <UserDashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "profile",
        element: <ProfileInfo />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <ToastContainer className="mt-5" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
