import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import store from "./store/store";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Outlet } from "react-router-dom";

function App() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                //* Either user will be logged in or we dispatch logout and redirect user accordingly.
                //* Either way the state remains in either of two states.
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex justify-center font-extrabold items-center bg-teal-400 w-full">
                <h2 className="text-3xl text-red-500">
                    Data is bieng fetched...
                </h2>
            </div>
        );
    }
    return (
        <div className="min-h-screen flex flex-wrap content-between bg-orage-500">
            <div className="w-full">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </div>
    );
}

export default App;
