import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Vision UI components
import VuiBox from "components/VuiBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Context
import { useVisionUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Routes
import routes, { getRoutesByRole } from "routes";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Constants
import { ACCESS_TOKEN, USER_ROLE } from "constants";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const role = localStorage.getItem(USER_ROLE);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!token || !role) {
      navigate("/sign-in");
    }
  }, [token, role, navigate]);

  return token && role ? children : null;
};

// Save last visited page
const saveLastVisitedPage = (path) => {
  if (!path.includes('/sign-in') && !path.includes('/sign-up')) {
    localStorage.setItem('lastVisitedPage', path);
  }
};

// Get default redirect based on role
const getDefaultRedirect = (role) => {
  switch(role) {
    case "HRMO":
      return "/dashboard";
    case "IT":
      return "/it-dashboard";
    case "Employee":
      return "/Training";
    default:
      return "/sign-in";
  }
};

// Logout Component
function Logout() {
  localStorage.clear();
  return <Navigate to="/sign-in" replace />;
}

export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const [userRole, setUserRole] = useState(null);
  const [userRoutes, setUserRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initial auth check and role setup
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const role = localStorage.getItem(USER_ROLE);
    const lastVisitedPage = localStorage.getItem('lastVisitedPage');

    setUserRole(role);
    
    if (role) {
      const roleRoutes = getRoutesByRole(role);
      setUserRoutes(roleRoutes);
    } else {
      setUserRoutes(routes);
    }

    // Handle initial redirect
    if (token && role) {
      if (pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/") {
        const redirectPath = lastVisitedPage || getDefaultRedirect(role);
        navigate(redirectPath);
      }
    } else if (!token && !pathname.includes("/sign-in") && !pathname.includes("/sign-up")) {
      navigate("/sign-in");
    }

    setIsLoading(false);
  }, []);

  // RTL cache setup
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Update document direction
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Save last visited page on route change
  useEffect(() => {
    saveLastVisitedPage(pathname);
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        // Wrap protected routes
        if (route.key !== "sign-in" && route.key !== "sign-up") {
          return (
            <Route
              path={route.route}
              element={
                <ProtectedRoute>
                  <route.component />
                </ProtectedRoute>
              }
              key={route.key}
            />
          );
        }
        
        // Auth routes don't need protection
        return <Route path={route.route} element={<route.component />} key={route.key} />;
      }
      return null;
    });

  if (isLoading) {
    return null; // or return a loading spinner
  }

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && userRole && (
          <>
            <Sidenav
              color={sidenavColor}
              brand=""
              brandName="ETMS"
              routes={userRoutes.filter(route => !route.hidden)}
              onMouseEnter={() => setMiniSidenav(dispatch, false)}
              onMouseLeave={() => setMiniSidenav(dispatch, true)}
            />
            <Configurator />
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(userRoutes)}
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate to={getDefaultRedirect(userRole)} replace />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && userRole && (
        <>
          <Sidenav
            color={sidenavColor}
            brand=""
            brandName="ETMS"
            routes={userRoutes.filter(route => !route.hidden)}
            onMouseEnter={() => setMiniSidenav(dispatch, false)}
            onMouseLeave={() => setMiniSidenav(dispatch, true)}
          />
          <Configurator />
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(userRoutes)}
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to={getDefaultRedirect(userRole)} replace />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}