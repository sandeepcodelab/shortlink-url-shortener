import React from "react";
import { Box, Typography, IconButton, Container } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 10,
        px: 2,
        py: 4,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(2, 6, 23, 0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            //   maxWidth: "1100px",
            mx: "auto",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Brand */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #38bdf8, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ShortLink
          </Typography>

          {/* Links */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <Typography
              component="a"
              href="#features"
              sx={{
                color: "#94a3b8",
                textDecoration: "none",
                "&:hover": { color: "#38bdf8" },
              }}
            >
              Features
            </Typography>

            <Typography
              component="a"
              href="#about"
              sx={{
                color: "#94a3b8",
                textDecoration: "none",
                "&:hover": { color: "#38bdf8" },
              }}
            >
              About
            </Typography>
          </Box>

          {/* Social Icons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              sx={{
                color: "#94a3b8",
                "&:hover": { color: "#38bdf8" },
              }}
            >
              <GitHubIcon />
            </IconButton>

            <IconButton
              sx={{
                color: "#94a3b8",
                "&:hover": { color: "#38bdf8" },
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Bottom Text */}
        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            color: "#64748b",
            fontSize: "0.9rem",
          }}
        >
          © {new Date().getFullYear()} ShortLink. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
