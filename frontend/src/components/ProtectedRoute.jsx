import React, { useContext } from 'react'
import {UserContext} from '../context/UserContext'
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({children}) => {

    const {token} = useContext(UserContext);

          if(!token) return  (
                <Navigate to={"/login"}/>
          )
  return children
  
}

export default ProtectedRoute