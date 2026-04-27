import React from "react";
import { Box, Typography, IconButton, Container, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FooterLogo from "../../assets/img/footer-logo.png";

export default function Footer() {
  const menus = ["Home", "Features", "About"];

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
            mx: "auto",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Brand */}
          <img
            src={FooterLogo}
            alt="ShortLink Logo"
            style={{
              height: "100px",
            }}
          />

          {/* Links */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            }}
          >
            {menus.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                sx={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  "&:hover": { color: "#38bdf8" },
                }}
              >
                {item}
              </Link>
            ))}
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
