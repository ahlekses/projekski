// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";

// Images
import AdobeXD from "examples/Icons/AdobeXD";
import Atlassian from "examples/Icons/Atlassian";
import Slack from "examples/Icons/Slack";
import Spotify from "examples/Icons/Spotify";
import Jira from "examples/Icons/Jira";
import Invision from "examples/Icons/Invision";
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";

export default function data() {
 
  return {
    columns: [
      { name: "intervention", align: "left" },
      
      { name: "factor", align: "center" },
      { name: "completion", align: "center" },
    ],
 /*<AdobeXD size="20px" />*/
    rows: [
      {
        intervention: (
          <VuiBox display="flex" alignItems="center">
           
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Seminars and Trainings
            </VuiTypography>
          </VuiBox>
        ),
       
        factor: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            Career development
          </VuiTypography>
        ),
        completion: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              60%
            </VuiTypography>
            <VuiProgress value={60} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        intervention: (
          <VuiBox display="flex" alignItems="center">
            
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Salary and benefits
            </VuiTypography>
          </VuiBox>
        ),
       
        factor: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
           Dissatisfaction
          </VuiTypography>
        ),
        completion: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              10%
            </VuiTypography>
            <VuiProgress value={10} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        intervention: (
          <VuiBox display="flex" alignItems="center">
           
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Reinforcement
            </VuiTypography>
          </VuiBox>
        ),
        participants: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar1, "Ryan Tompson"],
              [avatar3, "Alexander Smith"],
            ])}
          </VuiBox>
        ),
        factor: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
           Disengagement
          </VuiTypography>
        ),
        completion: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              100%
            </VuiTypography>
            <VuiProgress value={100} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        intervention: (
          <VuiBox display="flex" alignItems="center">
            
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
             Mandatory breaktime monitoring
            </VuiTypography>
          </VuiBox>
        ),
        
        factor: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
           Work life balance
          </VuiTypography>
        ),
        completion: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              100%
            </VuiTypography>
            <VuiProgress value={100} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        intervention: (
          <VuiBox display="flex" alignItems="center">
            
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
             Recognition program
            </VuiTypography>
          </VuiBox>
        ),
       
        factor: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            Disengagement
          </VuiTypography>
        ),
        completion: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              25%
            </VuiTypography>
            <VuiProgress value={25} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        intervention: (
          <VuiBox display="flex" alignItems="center">
           
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Department team building
            </VuiTypography>
          </VuiBox>
        ),
       
        factor: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
           Disengagement
          </VuiTypography>
        ),
        completion: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              40%
            </VuiTypography>
            <VuiProgress value={40} color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
    ],
  };
}
