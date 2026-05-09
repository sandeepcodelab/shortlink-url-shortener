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
  Link,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../assets/img/logo.png";
import { Link as RouterLink, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";

export default function UserNavbar({ openModal }) {
  const { user, isAuthenticated } = useAuth();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { pathname } = useLocation();
  const location = pathname ? pathname.replace("/", "") : "";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => setOpen(!open);

  const navItems = [
    { name: "Dashboard", path: "dashboard" },
    { name: "My Links", path: "mylinks" },
  ];

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
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Logo */}
            <RouterLink to="/">
              <img
                src={Logo}
                alt="ShortLink Logo"
                style={{
                  height: "40px",
                  // cursor: "pointer",
                }}
              />
            </RouterLink>
            {/* Desktop Menu */}
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  alignItems: "center",
                  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                }}
              >
                {navItems.map((item) => (
                  <RouterLink
                    key={item.name}
                    to={item.path}
                    className={`nav-link ${
                      location === item.path ? "active" : ""
                    }`}
                  >
                    {item.name}
                  </RouterLink>
                ))}

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Typography component="body2">{user.fullname}</Typography>
                  <Button
                    variant="outlined"
                    onClick={() => openModal("login")}
                    sx={{
                      color: "#cbd5f5",
                      borderRadius: "50px",
                      textTransform: "none",
                      px: 2,
                    }}
                  >
                    Logout
                  </Button>
                </Box>
              </Box>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton onClick={toggleDrawer} sx={{ color: "#94a3b8" }}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
            mt: 4,
            fontWeight: 500,
          }}
        >
          {navItems.map((item) => (
            <RouterLink
              key={item.name}
              to={item.path}
              className={`nav-link ${location === item.path ? "active" : ""}`}
            >
              {item.name}
            </RouterLink>
          ))}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "100%",
              px: 4,
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              onClick={() => openModal("login")}
              sx={{
                color: "#cbd5f5",
                borderRadius: "50px",
                textTransform: "none",
                px: 2,
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
