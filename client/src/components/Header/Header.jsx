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

export default function Header({ openModal }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { hash } = useLocation();
  const location = hash ? hash.replace("#", "") : "home";

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
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    underline="none"
                    sx={{
                      position: "relative",
                      color:
                        location === item.toLowerCase() ? "#38bdf8" : "#cbd5f5",
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      transition: "color 0.3s ease",

                      "&::after": {
                        content: '""',
                        position: "absolute",
                        left: "50%",
                        bottom: -4,
                        width: location === item.toLowerCase() ? "100%" : "0%",
                        height: "2px",
                        background: "linear-gradient(45deg, #38bdf8, #7d0cee)",
                        transform: "translateX(-50%)",
                        transition: "width 0.3s ease",
                      },

                      "&:hover": {
                        color: "#38bdf8",
                      },

                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    {item}
                  </Link>
                ))}

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
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
                    Login
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => openModal("signup")}
                    sx={{
                      background: "linear-gradient(45deg, #098bc4, #7d0cee)",
                      borderRadius: "50px",
                      textTransform: "none",
                      px: 2,
                      "&:hover": {
                        background: "linear-gradient(45deg, #0ea5e9, #4f46e5)",
                      },
                    }}
                  >
                    Sign up
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
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              underline="none"
              sx={{
                color: location === item.toLowerCase() ? "#38bdf8" : "#cbd5f5",
                fontWeight: 500,
                transition: "color 0.3s ease",

                "&:hover": {
                  color: "#38bdf8",
                },

                "&:hover::after": {
                  width: "100%",
                },
              }}
            >
              {item}
            </Link>
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
              Login
            </Button>

            <Button
              fullWidth
              variant="contained"
              onClick={() => openModal("signup")}
              sx={{
                background: "linear-gradient(45deg, #098bc4, #7d0cee)",
                borderRadius: "50px",
                textTransform: "none",
                px: 2,
                "&:hover": {
                  background: "linear-gradient(45deg, #0ea5e9, #4f46e5)",
                },
              }}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
