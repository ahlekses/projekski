import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import axios from "axios";  // Import axios for API calls

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import ProfileInfo from "./components/ProfileInfo";
import SecuritySettings from "./components/SecuritySettings";
import ProfileEditForm from "./components/ProfileEditForm";

function Billing() {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    full_name: "Guest",
    username: "Guest",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");  // Get the JWT token
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Fetched user data:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox mt={4}>
        <VuiBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7} xl={8}>
              <Card>
                <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px" p={3}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold">
                    Profile Information
                  </VuiTypography>
                  <VuiButton
                    variant={editMode ? "outlined" : "contained"}
                    color={editMode ? "primary" : "info"}
                    onClick={toggleEditMode}
                  >
                    {editMode ? "Cancel" : "Edit Profile"}
                  </VuiButton>
                </VuiBox>
                <VuiBox p={3}>
                  {editMode ? (
                    <ProfileEditForm userData={userData} toggleEditMode={toggleEditMode} />
                  ) : (
                    <ProfileInfo userData={userData} />
                  )}
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={5} xl={4}>
              <SecuritySettings />
            </Grid>
          </Grid>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
