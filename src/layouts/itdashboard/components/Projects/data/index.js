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
  const avatars = (uploadedby) =>
    uploadedby.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <VuiAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { dark } }) =>
              `${borderWidth[2]} solid ${dark.focus}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "filename", align: "left" },
      { name: "uploadedby", align: "center" },
      { name: "uploaddate", align: "center" },
    ],
 /*<AdobeXD size="20px" />*/
    rows: [
      {
        filename: (
          <VuiBox display="flex" alignItems="center">
           
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              re_Onboardinganswers-2024.csv
            </VuiTypography>
          </VuiBox>
        ),
        uploadedby: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar4, "Jessica Doe"],
            ])}
          </VuiBox>
        ),
        uploaddate: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
           24/04/18
          </VuiTypography>
        ),
        
      },
      {
        filename: (
          <VuiBox display="flex" alignItems="center">
            
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
           answers_Exitquestionnaire.csv
            </VuiTypography>
          </VuiBox>
        ),
        uploadedby: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar2, "Romina Hadid"],
             
            ])}
          </VuiBox>
        ),
        uploaddate: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
          23/01/15
          </VuiTypography>
        ),
       
      },
      {
        filename: (
          <VuiBox display="flex" alignItems="center">
           
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            onboardinganswers.csv
            </VuiTypography>
          </VuiBox>
        ),
        uploadedby: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar1, "Ryan Tompson"],
              
            ])}
          </VuiBox>
        ),
        uploaddate: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
           22/02/15
          </VuiTypography>
        ),
       
      },
  
    ],
  };
}
