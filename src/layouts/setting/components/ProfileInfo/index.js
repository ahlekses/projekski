// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function ProfileInfo({ userData }) {
  return (
    <VuiBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <VuiBox textAlign="center">
            <Avatar
              src="/images/avatar/1.jpg"
              alt="Profile Image"
              sx={{ width: 120, height: 120, margin: "0 auto", mb: 2 }}
            />
            <VuiTypography variant="h5" fontWeight="medium" color="white" mb={1}>
               {userData.full_name}
            </VuiTypography>
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Product Manager
            </VuiTypography>
          </VuiBox>
        </Grid>
        <Grid item xs={12} md={8}>
          <VuiBox>
            <VuiTypography variant="h6" color="white" mb={2}>
              Personal Information
            </VuiTypography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <VuiBox mb={2}>
                  <VuiTypography variant="caption" color="text" fontWeight="medium">
                    Full Name: 
                  </VuiTypography>
                  <VuiTypography variant="button" color="white" fontWeight="medium">
                  Pedro Penduko
                  </VuiTypography>
                </VuiBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <VuiBox mb={2}>
                  <VuiTypography variant="caption" color="text" fontWeight="medium">
                    Email: 
                  </VuiTypography>
                  <VuiTypography variant="button" color="white" fontWeight="medium">
                  hrofficer@company.com
                  </VuiTypography>
                </VuiBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <VuiBox mb={2}>
                  <VuiTypography variant="caption" color="text" fontWeight="medium">
                    Phone: 
                  </VuiTypography>
                  <VuiTypography variant="button" color="white" fontWeight="medium">
                  +63 929 404 2926
                  </VuiTypography>
                </VuiBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <VuiBox mb={2}>
                  <VuiTypography variant="caption" color="text" fontWeight="medium">
                    Location: 
                  </VuiTypography>
                  <VuiTypography variant="button" color="white" fontWeight="medium">
                   Iligan, PH
                  </VuiTypography>
                </VuiBox>
              </Grid>
            </Grid>
            <Divider light sx={{ my: 2 }} />
            <VuiBox>
              <VuiTypography variant="h6" color="white" mb={2}>
                About
              </VuiTypography>
              <VuiTypography variant="button" color="text" fontWeight="regular">
              HR Officer with 5+ years of experience specializing in managing UI/UX design and development. Passionate about creating intuitive and accessible digital experiences.
              </VuiTypography>
            </VuiBox>
          </VuiBox>
        </Grid>
      </Grid>
    </VuiBox>
  );
}

ProfileInfo.propTypes = {
  userData: PropTypes.shape({
    full_name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default ProfileInfo;
