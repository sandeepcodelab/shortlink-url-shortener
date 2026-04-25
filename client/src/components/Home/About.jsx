import React from "react";
import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <Box
      id="about"
      sx={{
        my: 18,
        px: 2,
        width: "100%",
        maxWidth: "800px",
        mx: "auto",
        textAlign: "center",
        scrollMarginTop: "80px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          background: "#38bdf8",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        About ShortLink
      </Typography>

      <Typography
        sx={{
          color: "#94a3b8",
          lineHeight: 1.8,
          fontSize: "1.05rem",
        }}
      >
        ShortLink helps you turn long, messy URLs into clean, easy-to-share
        links in seconds. Whether you’re sharing links on social media, sending
        them in messages, or organizing them for your projects, ShortLink keeps
        everything simple and accessible.
      </Typography>
      <Typography
        sx={{
          mt: 2,
          color: "#94a3b8",
          lineHeight: 1.8,
          fontSize: "1.05rem",
        }}
      >
        With a focus on speed and reliability, you can generate short links
        instantly and share them without hassle. The platform is built to
        provide a smooth experience, so you can focus on what matters—sharing
        content, not managing complicated URLs.
      </Typography>
    </Box>
  );
}
