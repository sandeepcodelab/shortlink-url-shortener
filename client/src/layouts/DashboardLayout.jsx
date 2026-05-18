import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";
import AppSidebar from "../components/Dashboard/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LinkIcon from "@mui/icons-material/Link";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const { user, userLogout } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      menuIcon: <DashboardIcon />,
    },
    {
      title: "Create Link",
      path: "/createlinks",
      menuIcon: <AddIcon />,
    },
    {
      title: "My Links",
      path: "/mylinks",
      menuIcon: <LinkIcon />,
    },
  ];

  return (
    <>
      <AppSidebar menuItems={menuItems} user={user} userLogout={userLogout}>
        <Outlet />
      </AppSidebar>
    </>
  );
}
