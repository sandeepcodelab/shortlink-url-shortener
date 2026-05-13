import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import Logo from "../../assets/img/logo.png";
import LogoIcon from "../../assets/img/logoIcon.png";
import { Link as RouterLink } from "react-router";

const drawerWidth = 240;

// const isActive = location.pathname === "/dashboard";

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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#0f172a",
  color: "#f8fafc",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  "& .MuiDrawer-paper": {
    backgroundColor: "#0f172a",
    color: "#cbd5e1",
    borderRight: "1px solid #1e293b",
  },

  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function AppSidebar({ children, menuItems }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <img
            src={LogoIcon}
            alt="ShortLink Logo"
            style={{
              height: "30px",
              marginRight: "25px",
              display: open && "none",
            }}
          />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <ChevronRightIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography noWrap component="div">
            <img
              src={Logo}
              alt="ShortLink Logo"
              style={{
                height: "40px",
              }}
            />
          </Typography>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon sx={{ color: "#f8fafc" }} />
            )}
          </IconButton>
        </DrawerHeader>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <List>
            {menuItems.map((item, index) => (
              <RouterLink
                to={item.path}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItem
                  key={item.title}
                  disablePadding
                  sx={{
                    display: "block",
                    bgcolor: "transparent",
                    color: "#fff",
                    "&:hover": { bgcolor: "rgba(37, 99, 235, 0.25)" },
                  }}
                >
                  <ListItemButton
                    sx={[
                      {
                        minHeight: 48,
                        px: 2.5,
                        bgcolor: index === 0 ? "#27364d" : "transparent",
                      },
                      open
                        ? {
                            justifyContent: "initial",
                          }
                        : {
                            justifyContent: "center",
                          },
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: "center",
                          color: "#94a3b8",
                          transition: "0.2s",
                        },
                        open
                          ? {
                              mr: 3,
                            }
                          : {
                              mr: "auto",
                            },
                      ]}
                    >
                      {item.menuIcon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={[
                        {
                          color: "#e2e8f0",
                        },
                        open
                          ? {
                              opacity: 1,
                            }
                          : {
                              opacity: 0,
                            },
                      ]}
                    />
                  </ListItemButton>
                </ListItem>
              </RouterLink>
            ))}
          </List>

          <List sx={{ mt: "auto", mb: 2 }}>
            {/* USER INFO */}
            <ListItem disablePadding sx={{ display: "block", px: 1 }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 56,
                    px: 2,
                    py: 0,
                    borderRadius: 2,
                    bgcolor: "rgba(101, 127, 188, 0.20)",
                    "&:hover": {
                      bgcolor: "rgba(101, 127, 188, 0.30)",
                    },
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                      color: "#94a3b8",
                    },
                    open
                      ? {
                          mr: 2,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  <PersonIcon />
                </ListItemIcon>

                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#f8fafc",
                      }}
                    >
                      Sanket
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#94a3b8",
                      }}
                    >
                      sanket@gmail.com
                    </Typography>
                  }
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>

            {/* LOGOUT BUTTON */}
            <ListItem disablePadding sx={{ display: "block", mt: 1, px: 1 }}>
              <ListItemButton
                onClick={() => console.log("logout")}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    borderRadius: 2,
                    color: "#f87171",

                    "&:hover": {
                      bgcolor: "rgba(248, 113, 113, 0.12)",
                    },
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                      color: "#f87171",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  <LogoutIcon />
                </ListItemIcon>

                <ListItemText
                  primary="Logout"
                  sx={[
                    {
                      color: "#f87171",
                    },
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {children}
      </Box>
    </Box>
  );
}
