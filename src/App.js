import './App.css';

import Carbrand from './components/estimateCreationForm/CarBrand';
import DataFetch from "./components/DataFetch";
import Navbar from "./components/Navbar";
import CarEstimate from './components/estimateCreationForm/CarEstimate'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Estimates from './components/Estimates'
import RootPage from "./components/RootPage";
import LogIn from "./components/authentification/LogIn";
import Register from "./components/authentification/Register";
import {AuthProvider, useAuth} from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import  secureLocalStorage  from  "react-secure-storage";
import {useEffect} from "react";
import Home from "./components/home/Home";
import UserProfile from './components/dashboard/userProfile/UserProfile'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Dashboard from './components/dashboard/Dashboard';



const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
        children: [
            {
                path: "devize",
                element: <PrivateRoute component={Estimates}></PrivateRoute>
            },
            {
                path: "creare-deviz",
                element:  <PrivateRoute component={CarEstimate}></PrivateRoute>
            },

            {
                path: "acasa",
                element:  <PrivateRoute component={Home}></PrivateRoute>
            },

            {
                path: "profil",
                element:  <PrivateRoute component={UserProfile}></PrivateRoute>
            },


            {
                path: "utilizator",
                element:  <PrivateRoute component={Dashboard}></PrivateRoute>
            },


            {
                path: "log-in",
                element:  <PublicRoute component={LogIn}></PublicRoute>
            },
            {
                path: "",
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
