import { useEffect, useState } from "react";
import { getCurrentUser } from "utils/useUser"; // or from your AuthContext

function Overview() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) setUser(currentUser);
  }, []);

  return (
    <DashboardLayout>
      <Header />
      <VuiBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={4} xxl={3}>
            <Welcome />
          </Grid>

          <Grid item xs={12} xl={5} xxl={6}>
            <CarInformations />
          </Grid>

          <Grid item xs={12} xl={3} xxl={3}>
            {user && (
              <ProfileInfoCard
                title="profile information"
                description={`Hi, I’m ${user.firstName} ${user.lastName}, Decisions: If you can’t decide, the answer is no.`}
                info={{
                  fullName: `${user.firstName} ${user.lastName}`,
                  mobile: user.phone || "N/A",
                  email: user.email,
                  location: user.location || "Unknown",
                }}
                social={[
                  {
                    link: user.socials?.facebook || "#",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: user.socials?.twitter || "#",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: user.socials?.instagram || "#",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
              />
            )}
          </Grid>
        </Grid>
      </VuiBox>

      {/* The rest of your layout */}
      <Grid container spacing={3} mb="30px">
        <Grid item xs={12} xl={3}>
          <PlatformSettings />
        </Grid>
        <Grid item xs={12} xl={9}>
          {/* Project cards remain unchanged */}
        </Grid>
      </Grid>

      <Footer />
    </DashboardLayout>
  );
}
