import React from 'react';
import {useAuth} from "../contexts/AuthContext";
import {Navigate, redirect} from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage";

import LogIn from "./authentification/LogIn";
function PublicRoute ({ component: Component, ...rest}) {

    const user = useAuth()
    if (secureLocalStorage.getItem("logged-in"))
        return (
            <Navigate redirect to = "/acasa"/>
        )
    else
        return <Component/>
}

export default PublicRoute;