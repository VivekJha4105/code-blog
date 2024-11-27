import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn";
import { ProtectedLayer } from "./Components/index";
import SignUp from "./pages/SignUp.jsx";
import EditBlog from "./pages/EditBlog.jsx";
import Blogs from "./pages/Blogs.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import Blog from "./pages/Blog.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/signin",
                element: (
                    <ProtectedLayer authentication={false}>
                        <SignIn />
                    </ProtectedLayer>
                ),
            },
            {
                path: "/signup",
                element: (
                    <ProtectedLayer authentication={false}>
                        <SignUp />
                    </ProtectedLayer>
                ),
            },
            {
                path: "/all-blogs",
                element: (
                    <ProtectedLayer authentication={true}>
                        <Blogs />
                    </ProtectedLayer>
                ),
            },
            {
                path: "/add-blog",
                element: (
                    <ProtectedLayer authentication={true}>
                        <CreateBlog />
                    </ProtectedLayer>
                ),
            },
            {
                path: "/edit-blog/:slug",
                element: (
                    <ProtectedLayer authentication={true}>
                        <EditBlog />
                    </ProtectedLayer>
                ),
            },
            {
                path: "/blog/:slug",
                element: (
                    <ProtectedLayer authentication={true}>
                        <Blog />
                    </ProtectedLayer>
                ),
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
