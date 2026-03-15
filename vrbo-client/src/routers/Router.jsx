import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import HostingDashboard from "../pages/HostingDashboard/HostingDashboard";
import Login from "../pages/Login/Login";
import NotFoundPage from "../pages/NotFoundPage";
import Registration from "../pages/Registration/Registration";
import Profile from './../pages/Profile/Profile';
import Listings from "../pages/Listings/Listings";
import Earnings from "../pages/Earnings/Earnings";
import Reservations from "../pages/Reservations/Reservations";
import AdminPanel from "../layout/AdminPanel/AdminPanel";
import AdminControl from "../pages/AdminControl/AdminControl";
import AdminOverview from "../pages/AdminOverview/AdminOverview";
import CreateNewList from "../pages/CreateNewList/CreateNewList";
import UpdateEarnings from "../pages/UpdateEarnings/UpdateEarnings";
import UserControl from "../pages/UserControl/UserControl";

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
      },
      {
        path: "earnings",
        element: <Earnings />
      },
      {
        path: "reservation",
        element: <Reservations />
      }
    ],
  },
  {
    path: 'admin-panel',
    element: <AdminPanel />,
    children: [
      {
        path: 'admin-overview',
        element: <AdminOverview />
      },
      {
        path: 'admin-control',
        element: <AdminControl />
      },
      {
        path: 'earnings-update',
        element: <UpdateEarnings />
      },
      {
        path: 'user-control',
        element: <UserControl />
      },
      {
        path: 'create-new-list',
        element: <CreateNewList/>
      },
      // Catch-all for admin-panel routes
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);


