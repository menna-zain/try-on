import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  if (!token || !role) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    // توجيه حسب الدور
    if (role === "admin") return <Navigate to="/dashboard" />;
    if (role === "user") return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;










// import React, { useContext } from 'react'
// import { Navigate } from 'react-router-dom'
// import { authContext } from '../../Contexts/AuthContext'

// export default function ProtectedRoute({children}) {

//   const { isLoggedIn, userRole } = useContext(authContext);

//   if (!isLoggedIn) {
//     return <Navigate to="/login" />;
//   }

//   if (userRole !== 'user') {
//     return <Navigate to="/dashboard" />; 
//   }

//   return children;
// }
   