import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import NotFoundPage from "../pages/NotFoundPage";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/registration",
                element: <Registration/>
            },
            {
                path: "/*",
                element: <NotFoundPage />
            }
        ]
    }
])