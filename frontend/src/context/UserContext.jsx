
import React, { createContext, useEffect, useState } from "react";


export const UserContext = createContext();

export default function UserContextProvider({children}){

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(()=>{
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token')
        if(savedUser) setUser(JSON.parse(savedUser));
        if(savedToken) setToken(savedToken);

    },[]);

    const login = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", jwtToken);
        
    }

    const logout = () =>{
        setUser(null);
        setToken(null);
        localStorage.clear();
    }

    const value = {
        user, 
        token, 
        login,
        logout,
        showForm,
        setShowForm
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};