import React from "react";
import { Button, Typography, Box, Container } from "@mui/material";

const LandingPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          flex: "1",
          textAlign: "center",
          py: 5,
        }}
      >
        {/* App Title */}
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          JobTracker
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, color: "#555" }}>
          Automatically track and manage your job applications effortlessly.
        </Typography>

        {/* Hero Image */}
        {/* <img
          src="https://via.placeholder.com/800x400"
          alt="Job Tracker Hero"
          style={{ maxWidth: "100%", marginBottom: "20px", borderRadius: "10px" }}
        /> */}

        {/* Features */}
        <Typography variant="h6" sx={{ my: 3 }}>
          Features:
        </Typography>
        <Typography variant="body1" sx={{ color: "#666", mb: 4 }}>
          🚀 Reads your emails securely<br />
          📜 Prepares a comprehensive list of jobs you applied to<br />
          📊 Provides a personalized job dashboard
        </Typography>

        {/* Call-to-Action */}
        <Button
          variant="contained"
          href="https://jobtracker-m84h.onrender.com/auth/google"
          color="primary"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: "30px",
            fontSize: "18px",
          }}
        >
          Login with Google
        </Button>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        
        sx={{
          backgroundColor: "#333",
          py: 3,
          textAlign: "center",
          mt: "auto",
        }}
      >
        <Typography variant="body2" sx={{ color: "#fff" }}>
          &copy; 2024 JobTracker | All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
