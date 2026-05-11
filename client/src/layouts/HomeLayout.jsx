import { useState } from "react";
import Header from "../components/Header/Header";
import AuthModal from "../components/AuthModal/AuthModal";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <AuthModal />
      <Footer />
    </>
  );
}
