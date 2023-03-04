import './App.css';

import Carbrand from './components/estimateCreationForm/CarBrand';
import DataFetch from "./components/DataFetch";
import Navbar from "./components/Navbar";
import CarEstimate from './components/estimateCreationForm/CarEstimate'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Estimates from './components/Estimates'
import About from './components/about/About'
import RootPage from "./components/RootPage";
import LogIn from "./components/authentification/LogIn";
import Register from "./components/authentification/Register";
import {AuthProvider, useAuth} from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import  secureLocalStorage  from  "react-secure-storage";
import {useEffect} from "react";
import Home from "./components/home/Home";
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
        children: [
            {
                path: "istoric-devize",
                element: <PrivateRoute component={Estimates}></PrivateRoute>
            },
            {
                path: "creare-deviz",
                element:  <PrivateRoute component={CarEstimate}></PrivateRoute>
            },

            {
                path: "about",
                element:  <PrivateRoute component={Home}></PrivateRoute>
            },

            {
                path: "log-in",
                element:  <PublicRoute component={LogIn}></PublicRoute>
            },
            {
                path: "",
                // element:  <Home />
                element:  <PublicRoute component={LogIn}></PublicRoute>

            },

            {
                path: "register",
                element:  <PublicRoute component={Register}></PublicRoute>
            },


        ],
    },
]);

function App() {
    useEffect(() => {
        secureLocalStorage.setItem("logged-in", false);

    }, []);
    return(
        <AuthProvider>

                <RouterProvider router={router} />
        </AuthProvider>
    )


}

export default App;
