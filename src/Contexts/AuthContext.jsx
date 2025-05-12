import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("token") != null);
  const [userRole, setUserRole] = useState(Cookies.get("role"));

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    setIsLoggedIn(token != null);
    setUserRole(role);
  }, []); 

  return (
    <authContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
