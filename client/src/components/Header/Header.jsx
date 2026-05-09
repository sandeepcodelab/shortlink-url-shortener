import { useAuth } from "../../context/AuthContext";
import GuestNavbar from "./GuestNav";
import UserNavbar from "./UserNav";

export default function Header({ openModal }) {
  const { isAuthenticated, loading } = useAuth();

  // if (loading) return null;

  return <>{isAuthenticated ? <UserNavbar /> : <GuestNavbar />}</>;
}
