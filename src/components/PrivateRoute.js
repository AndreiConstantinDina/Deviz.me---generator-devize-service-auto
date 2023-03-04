import React from 'react';
import {useAuth} from "../contexts/AuthContext";
import {Navigate, redirect} from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage";

import LogIn from "./authentification/LogIn";
function PrivateRoute ({ component: Component, ...rest}) {

    const {user} = useAuth()
    console.log(user)
    if (!secureLocalStorage.getItem("logged-in"))
        return (
            <Navigate redirect to = "/log-in"/>
        )
    else
        return <Component/>


}

export default PrivateRoute;