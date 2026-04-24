import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => setOpen(!open);

  const navItems = ["Home", "Features", "About"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: scrolled
            ? "linear-gradient(90deg, rgba(15,23,42,0.7), rgba(2,6,23,0.7))"
            : "linear-gradient(90deg, #0f172a, #020617)",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
          borderBottom: "1px solid rgba(255,255,255,0.08)",

          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              letterSpacing: 1,
              background: "linear-gradient(45deg, #38bdf8, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
            }}
          >
            ShortLink
          </Typography>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{
                    color: "#cbd5f5",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      color: "#38bdf8",
                    },
                  }}
                >
                  {item}
                </Button>
              ))}

              <Button
                sx={{
                  color: "#cbd5f5",
                  textTransform: "none",
                }}
              >
                Login
              </Button>

              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(45deg, #6366f1, #38bdf8)",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 2,
                  "&:hover": {
                    background: "linear-gradient(45deg, #4f46e5, #0ea5e9)",
                  },
                }}
              >
                Get Started
              </Button>
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton onClick={toggleDrawer} sx={{ color: "#94a3b8" }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        slotProps={{
          paper: {
            sx: {
              background: "rgba(2, 6, 23, 0.9)",
              backdropFilter: "blur(10px)",
              color: "#fff",
              width: 260,
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            },
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item}
              onClick={toggleDrawer}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}

          <ListItem button sx={{ textAlign: "center" }}>
            <ListItemText primary="Login" />
          </ListItem>

          <ListItem>
            <Button
              fullWidth
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #6366f1, #38bdf8)",
              }}
            >
              Get Started
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
