import React from "react";
import { Box, Typography } from "@mui/material";

export default function Features() {
  const features = [
    {
      title: "Instant Link Shortening",
      desc: "Convert long URLs into short links in seconds with a fast and seamless experience.",
    },
    {
      title: "Clean & Shareable Links",
      desc: "Generate simple, readable links that are easy to share across social media and messages.",
    },
    {
      title: "One-Click Copy",
      desc: "Copy your shortened link instantly and share it anywhere without extra steps.",
    },
    {
      title: "Access Anytime",
      desc: "Your shortened links are saved and can be accessed whenever you need them.",
    },
  ];

  return (
    <Box
      id="features"
      sx={{
        px: 2,
        width: "100%",
        maxWidth: "1100px",
        mx: "auto",
        textAlign: "center",
        scrollMarginTop: "80px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 5,
          background: "linear-gradient(45deg, #38bdf8, #6366f1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Features
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
          },
          gap: 3,
        }}
      >
        {features.map((item, index) => (
          <Box
            key={index}
            sx={{
              p: 3,
              borderRadius: "16px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-6px)",
                borderColor: "#38bdf8",
              },
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: "#fff" }}>
              {item.title}
            </Typography>

            <Typography sx={{ color: "#94a3b8" }}>{item.desc}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
