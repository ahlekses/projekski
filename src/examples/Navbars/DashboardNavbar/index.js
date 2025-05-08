import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import Breadcrumbs from "examples/Breadcrumbs";
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
} from "examples/Navbars/DashboardNavbar/styles";

function DashboardNavbar({ absolute, light, isMini }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const route = useLocation().pathname.split("/").slice(1);

  // ✅ Fetch username from localStorage when the component loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUsername(JSON.parse(storedUser).username);
    } else {
      setUsername("Guest"); // Fallback if no user is found
    }
  }, []);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.clear(); // Clear ALL local storage (token, user, etc.)
    navigate("/authentication/sign-in"); // Redirect to login
    window.location.reload(); // Force re-render to update navbar
  };

  return (
    <AppBar
      position={absolute ? "absolute" : "static"}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar: true, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <VuiBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </VuiBox>
        {!isMini && (
          <VuiBox sx={(theme) => navbarRow(theme, { isMini })}>
            <VuiBox pr={1}>
              <VuiInput placeholder="Search..." icon={{ component: "search", direction: "left" }} />
            </VuiBox>
            <VuiBox color={light ? "white" : "inherit"}>
              {/* ✅ Show Username */}
              <IconButton sx={navbarIconButton} size="small">
                <Icon>account_circle</Icon>
                <VuiTypography variant="button" fontWeight="medium">
                  {username}
                </VuiTypography>
              </IconButton>
              {/* ✅ Logout Button */}
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleLogout}
              >
                <Icon>logout</Icon>
              </IconButton>
            </VuiBox>
          </VuiBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
