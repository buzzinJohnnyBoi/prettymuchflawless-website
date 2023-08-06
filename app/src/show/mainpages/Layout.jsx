import React from "react";
import {Outlet} from "react-router-dom";
import Nav from "../nav/nav";
import Footer from "../footer/footer";

const Layout = () => {
  return (
    <>
      <Outlet />
      <Nav />
      <Footer />
    </>
  );
};

export default Layout;