import { useState } from "react";
import Header from "../components/Header/Header";
import AuthModal from "../components/AuthModal/AuthModal";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";

export default function HomeLayout() {
  // const [open, setOpen] = useState(false);
  // const [formType, setFormType] = useState("login");

  return (
    <>
      <Header
      // openModal={(type) => {
      //   setFormType(type);
      //   setOpen(true);
      // }}
      />

      <Outlet />

      <AuthModal
      // open={open}
      // handleClose={() => setOpen(false)}
      // formType={formType}
      // setFormType={setFormType}
      />

      <Footer />
    </>
  );
}
