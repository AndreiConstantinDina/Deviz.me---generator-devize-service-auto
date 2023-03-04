import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../components/estimateCreationForm/firebase'
import LogIn from "../components/estimateCreationForm/LogIn";
import Register from "../components/estimateCreationForm/Register";
import  secureLocalStorage  from  "react-secure-storage";




const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}
export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function register(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logOut(){
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setLoading(false)
            setCurrentUser(user)
            user ? secureLocalStorage.setItem("logged-in", true) : secureLocalStorage.setItem("logged-in", false)
        })
        return unsubscribe
    }, [])



    const value = {
        currentUser,
        login,
        register,
        logOut
    }
    return(
        <AuthContext.Provider value = { value }>
            {children}
            {/*{currentUser ? children : <div><LogIn/><Register/></div>}*/}
        </AuthContext.Provider>
    )
}