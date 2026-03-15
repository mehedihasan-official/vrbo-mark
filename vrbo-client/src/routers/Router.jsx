import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import HostingDashboard from "../pages/HostingDashboard/HostingDashboard";
import Login from "../pages/Login/Login";
import NotFoundPage from "../pages/NotFoundPage";
import Registration from "../pages/Registration/Registration";
import Profile from './../pages/Profile/Profile';
import Listings from "../pages/Listings/Listings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
  {
    path: "/hostingDashboard",
    element: <HostingDashboard />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "listings",
        element: <Listings/>
      }
    ],
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);


