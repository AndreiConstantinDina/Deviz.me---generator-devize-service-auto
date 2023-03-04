import React from 'react';
import {useAuth} from "../contexts/AuthContext";
import {Navigate, redirect} from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage";

import LogIn from "./estimateCreationForm/LogIn";
function PublicRoute ({ component: Component, ...rest}) {

    const {user} = useAuth()
    console.log(user)
    if (secureLocalStorage.getItem("logged-in"))
        return (
            <Navigate redirect to = "/about"/>
        )
    else
        return <Component/>


}

export default PublicRoute;