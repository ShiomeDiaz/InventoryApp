import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from 'jwt-decode';  // Importación corregida

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [infoUser, setInfoUser] = useState(null);
  const [token, setToken] = useState(cookies?.token || undefined);

  useEffect(() => {
    if (token && typeof token === 'string' && token.trim() !== '') {
      try {
        const decodedToken = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < new Date().getTime();
        if (!isExpired) {
          setInfoUser(decodedToken);
        } else {
          logout();  // Logout automatically if the token has expired
        }
      } catch (error) {
        console.error("Error decoding: ", error);
        logout();  // Logout if there's an error decoding the token
      }
    }
  }, [token, removeCookie]);
  
  const login = (newToken) => {
    setToken(newToken);
    setCookie("token", newToken, {
      expires: new Date(Date.now() + 8 * 3600 * 1000), // 8 hours
      path: "/",
      sameSite: "strict"
    });
  };
  
  const logout = () => {
    setToken(null);
    removeCookie("token", { path: "/" });
    setInfoUser(null);  // Clear user info on logout
  };
  
  const authValue = useMemo(() => ({ 
    info: infoUser, 
    logout, 
    login,
    isUserAdmin: () => infoUser?.role === 'admin'
  }), [infoUser, logout, login]);
  
  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
  
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
