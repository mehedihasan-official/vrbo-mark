import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import NotFoundPage from "../pages/NotFoundPage";


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
                path: "/*",
                element: <NotFoundPage />
            }
        ]
    }
])