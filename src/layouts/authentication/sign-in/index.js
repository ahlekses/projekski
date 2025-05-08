import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/signInImage.png";
import api from "api";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ROLE } from "constants";
import borders from "assets/theme/base/borders";
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const role = localStorage.getItem(USER_ROLE);
    if (token && role) {
      redirectBasedOnRole(role);
    }
  }, []);

  const redirectBasedOnRole = (role) => {
    switch (role) {
      case "HRMO":
        navigate("/dashboard");
        break;
      case "IT":
        navigate("/it-dashboard");
        break;
      case "Employee":
        navigate("/Training");
        break;
      default:
        navigate("/dashboard");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Get JWT token
      const tokenResponse = await api.post("/token/", {
        username,
        password,
      });

      const { access, refresh } = tokenResponse.data;

      // Store tokens
      localStorage.setItem(ACCESS_TOKEN, access);
      if (refresh) {
        localStorage.setItem(REFRESH_TOKEN, refresh);
      }

      // Get user profile to determine role
      const userResponse = await api.get("/users/me/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      console.log('User Response:', userResponse.data);
      console.log('User Groups:', userResponse.data.groups);

      // Get the role from groups, prioritizing IT role
      const userGroups = userResponse.data.groups || [];
      let userRole = "Employee"; // Default role
      
      if (userGroups.includes("IT")) {
        userRole = "IT";
      } else if (userGroups.includes("HRMO")) {
        userRole = "HRMO";
      }
      
      console.log('Selected Role:', userRole);
      
      localStorage.setItem(USER_ROLE, userRole);
      localStorage.setItem("user", JSON.stringify({ username }));

      console.log('Stored Role:', localStorage.getItem(USER_ROLE));

      redirectBasedOnRole(userRole);
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        if (error.response.status === 401) {
          setError("Invalid username or password");
        } else if (error.response.status === 400) {
          setError("Please check your input and try again");
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <CoverLayout
      title="Welcome!"
      color="white"
      description="Use these awesome forms to login or create new account in your project for free."
      image={bgSignIn}
      premotto="Data driven"
      motto="ETMS"
      cardContent
    >
      <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
        <VuiBox
          component="form"
          role="form"
          borderRadius="inherit"
          p="45px"
          onSubmit={handleSubmit}
          sx={({ palette: { secondary } }) => ({
            backgroundColor: secondary.focus,
          })}
        >
          <VuiTypography
            color="white"
            fontWeight="bold"
            textAlign="center"
            mb="24px"
            sx={({ typography: { size } }) => ({
              fontSize: size.lg,
            })}
          >
            Sign In
          </VuiTypography>
     
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Username
              </VuiTypography>
            </VuiBox>
            <VuiInput
              fullWidth
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username..."
              sx={{
                fontSize: "1rem",
                borderRadius: borders.borderRadius.lg,
                background: "#181C2F",
                color: "#fff",
                border: "1px solid #333",
                padding: "12px 16px",
                marginBottom: "16px",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
                '&:focus': {
                  border: '1.5px solid #0075FF',
                  background: '#23284a',
                },
                'input': {
                  color: '#fff',
                }
              }}
            />
          </VuiBox>
      
          <VuiBox mb={2}>
            <VuiBox mb={1} ml={0.5}>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                Password
              </VuiTypography>
            </VuiBox>
            <VuiInput
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password..."
              sx={{
                fontSize: "1rem",
                borderRadius: borders.borderRadius.lg,
                background: "#181C2F",
                color: "#fff",
                border: "1px solid #333",
                padding: "12px 16px",
                marginBottom: "16px",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
                '&:focus': {
                  border: '1.5px solid #0075FF',
                  background: '#23284a',
                },
                'input': {
                  color: '#fff',
                }
              }}
            />
          </VuiBox>
          <VuiBox display="flex" alignItems="center">
            <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
            <VuiTypography
              variant="caption"
              color="white"
              fontWeight="medium"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;Remember me
            </VuiTypography>
          </VuiBox>
          <VuiBox mt={4} mb={1}>
            <VuiButton color="info" fullWidth type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'SIGN IN'}
            </VuiButton>
          </VuiBox>
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              Don't have an account?{" "}
              <VuiTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Sign up
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </GradientBorder>
    </CoverLayout>
  );
}

export default SignIn;
