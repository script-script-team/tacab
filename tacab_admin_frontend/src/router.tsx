import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/auth/login";
import NotFound from "./pages/NotFound";
import DashIntro from "./pages/Dashboard/DashIntro";
import Uploads from "./pages/Dashboard/Uploads";
import Results from "./pages/Dashboard/Results";
import Students from "./pages/Dashboard/Students";
import Settings from "./pages/Dashboard/Admins";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
                children: [
                    {
                        index: true,
                        element: <DashIntro />
                    },
                    {
                        path: "uploads",
                        element: <Uploads />
                    },
                    {
                        path: "results",
                        element: <Results />
                    },
                    {
                        path: "students",
                        element: <Students />
                    },
                    {
                        path: "admins",
                        element: <Settings />
                    },
                ]
            },
            {
                path: "/auth",
                children: [
                    {
                        path: "login",
                        element: <Login />
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);