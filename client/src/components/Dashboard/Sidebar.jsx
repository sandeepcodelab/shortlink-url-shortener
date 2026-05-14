import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

import Logo from "../../assets/img/logo.png";
import LogoIcon from "../../assets/img/logoIcon.png";
import { Link as RouterLink, useLocation } from "react-router";

const drawerWidth = 240;
const miniDrawerWidth = 64;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: miniDrawerWidth,
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#0f172a",
  color: "#f8fafc",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  // MOBILE
  width: "100%",
  marginLeft: 0,

  // DESKTOP
  [theme.breakpoints.up("sm")]: {
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,

      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),

    ...(!open && {
      marginLeft: `${miniDrawerWidth}px`,
      width: `calc(100% - ${miniDrawerWidth}px)`,
    }),
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  "& .MuiDrawer-paper": {
    backgroundColor: "#0f172a",
    color: "#cbd5e1",
    borderRight: "1px solid #1e293b",
  },

  ...(open && {
    ...openedMixin(theme),

    "& .MuiDrawer-paper": {
      ...openedMixin(theme),

      backgroundColor: "#0f172a",
      color: "#cbd5e1",
      borderRight: "1px solid #1e293b",
    },
  }),

  ...(!open && {
    ...closedMixin(theme),

    "& .MuiDrawer-paper": {
      ...closedMixin(theme),

      backgroundColor: "#0f172a",
      color: "#cbd5e1",
      borderRight: "1px solid #1e293b",
    },
  }),
}));

export default function AppSidebar({ children, menuItems, user }) {
  const theme = useTheme();
  const location = useLocation();

  const activePage = menuItems.find((item) => item.path === location.pathname);

  // Mobile Drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  // Desktop Mini Drawer
  const [open, setOpen] = useState(true);

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* TOP SECTION */}
      <Box>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: open ? "flex-start" : "center",
            px: 1,
          }}
        >
          {open ? (
            <img
              src={Logo}
              alt="ShortLink Logo"
              style={{
                height: "40px",
              }}
            />
          ) : (
            <img
              src={LogoIcon}
              alt="ShortLink Logo"
              style={{
                height: "30px",
              }}
            />
          )}
        </Toolbar>

        <List>
          {menuItems.map((item, index) => (
            <RouterLink
              key={item.title}
              to={item.path}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  bgcolor: "transparent",
                  color: "#fff",
                  "&:hover": { bgcolor: "rgba(37, 99, 235, 0.25)" },
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? "initial" : "center",
                    bgcolor:
                      location.pathname === item.path
                        ? "rgba(37, 99, 235, 0.25)"
                        : "transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: "#fff",
                    }}
                  >
                    {item.menuIcon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: open ? 1 : 0,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </RouterLink>
          ))}
        </List>
      </Box>

      {/* BOTTOM SECTION */}
      <Box>
        <Divider sx={{ borderColor: "rgba(225, 225, 225, 0.10)" }} />

        {/* USER INFO */}
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 56,
                px: 2.5,
                py: 1,
                mx: 0.5,
                justifyContent: open ? "initial" : "center",
                borderRadius: 2,
                bgcolor: "rgba(101, 127, 188, 0.20)",
                "&:hover": {
                  bgcolor: "rgba(101, 127, 188, 0.30)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <PersonIcon />
              </ListItemIcon>

              <ListItemText
                primary={user.fullname}
                secondary={user.email}
                sx={{
                  opacity: open ? 1 : 0,

                  "& .MuiListItemText-primary": {
                    color: "#fff",
                  },

                  "& .MuiListItemText-secondary": {
                    color: "#aaa",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>

          {/* LOGOUT */}
          <ListItem disablePadding sx={{ display: "block", my: 1 }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
                mx: 0.5,
                justifyContent: open ? "initial" : "center",
                borderRadius: 2,
                color: "#f87171",

                "&:hover": {
                  bgcolor: "rgba(248, 113, 113, 0.12)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "#ff5252",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>

              <ListItemText
                primary="Logout"
                sx={{
                  opacity: open ? 1 : 0,

                  "& .MuiListItemText-primary": {
                    color: "#ff5252",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* APPBAR */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* Mobile Menu */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleMobileToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Drawer Toggle */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { xs: "none", sm: "block" },
            }}
          >
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

          {activePage && (
            <Typography variant="h6" noWrap>
              {activePage.title}
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <MuiDrawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleMobileToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },

          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#0f172a",
            color: "#cbd5e1",
            borderRight: "1px solid #1e293b",
          },
        }}
      >
        {drawerContent}
      </MuiDrawer>

      {/* DESKTOP MINI DRAWER */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Drawer variant="permanent" open={open}>
          {drawerContent}
        </Drawer>
      </Box>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
}
