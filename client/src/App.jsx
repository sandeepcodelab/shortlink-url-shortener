import Header from "../src/components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router";

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
