import {Navigate} from "react-router-dom" ;
import React from 'react'

function ProtectedRoute({children}) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if(!token){
    return <Navigate to="/login" />
  }
  return children;
}

export default ProtectedRoute