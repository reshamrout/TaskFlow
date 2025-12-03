import React, { useContext } from 'react'
import {UserContext} from '../context/UserContext'
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({children}) => {

    const {token, loading} = useContext(UserContext);

    if(loading) return <p>Loading....</p>
    return token ? <Outlet/> : <Navigate to="/login"/>
  
}

export default ProtectedRoute