import React from "react";
import { Navigate } from "react-router-dom";

const ProtecrtedRoute = ({children}) => {
    const isAutf = !!localStorage.getItem("userEmail"); 
    return isAutf ? children : <Navigate to = "/login" />
}

export default ProtecrtedRoute