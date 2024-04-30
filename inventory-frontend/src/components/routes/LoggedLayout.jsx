import {
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,
  } from "react-router-dom";
  import { Login } from "../../views/Login/Login";
  import { Sidebar } from "../Layout";
  import { Inventary } from "../../views/Home/Inventary";
  import { useEffect, useState } from "react";
  import { useCookies } from "react-cookie";
  import { Dashboard } from "../../views/Home/Dashboard";
  

  export function LoggedLayout() {
    const [isLoginPage, setIsLoginPage] = useState(false);
    const [cookies] = useCookies(["token"]);
    const navigate = useNavigate();
    const location = useLocation();
    const [initialNavigation, setInitialNavigation] = useState(false);
  
    useEffect(() => {
      setIsLoginPage(location.pathname === "/login");
      if (cookies.token && !initialNavigation) {
        navigate("/dashboard", { replace: true });
        setInitialNavigation(true);
      }
    }, [cookies.token, navigate, initialNavigation, location.pathname]);
  
    useEffect(() => {
      if (!cookies.token && !isLoginPage) {
        navigate("/login");
      }
    }, [cookies.token, isLoginPage, navigate]);

    useEffect(() => {
      // Verificar si el usuario está en la página de login y si tiene un token válido
      if (!cookies.token && location.pathname !== "/login") {
        // Redireccionar a login solo si no está ya en login
        navigate("/login", { replace: true });
      } else if (cookies.token && (location.pathname === "/login" || location.pathname === "/")) {
        // Redireccionar a dashboard si está en login y tiene token
        navigate("/dashboard", { replace: true });
      }
    }, [cookies.token, location.pathname, navigate]);

    if (!cookies.token) {
      // Si no hay token, muestra solo la ruta de login
        return (
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        );
    }
  
    return (
      <div className="relative flex min-h-screen">
        <Sidebar />
        <div className="flex-grow px-8 py-2 h-[100vh] overflow-y-clip max-h-screen overflow-x-auto">
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventary" element={<Inventary />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    );
  }
