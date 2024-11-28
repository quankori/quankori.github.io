// src/App.js

import React from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";
import backgroundImage from "../images/home/mountain.jpg";
import avatarImage from "../images/home/avatar.jpg";

function App() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Background Layer */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          transform: "scale(1.1)", // Slightly scale to cover the edges after blur
          zIndex: 1,
        }}
      />

      {/* Overlay to darken the background for better contrast */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 2,
        }}
      />

      {/* Content Layer */}
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "#fff",
          textAlign: "center",
          zIndex: 3,
          padding: 2,
        }}
      >
        <Avatar
          alt="Your Name"
          src={avatarImage}
          sx={{ width: 150, height: 150, mb: 2, border: "4px solid #fff" }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Quan Nguyen
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Software Engineer
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() =>
            (window.location.href = "/docs/home")
          }
        >
          Go To My Page
        </Button>
        <Box sx={{ mt: 2 }}>
          <IconButton
            aria-label="GitHub"
            href="https://github.com/quankori"
            target="_blank"
            rel="noopener"
            sx={{ color: "#fff" }}
          >
            <GitHub />
          </IconButton>
          <IconButton
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/quankori/" // Replace with your LinkedIn URL
            target="_blank"
            rel="noopener"
            sx={{ color: "#0e76a8" }}
          >
            <LinkedIn />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
