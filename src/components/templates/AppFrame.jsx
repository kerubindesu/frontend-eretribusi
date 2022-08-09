import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "../UI/organism";

const AppFrame = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="px-4 min-h-screen flex flex-col justify-between mt-16 lg:pl-[16rem] overflow-hidden">
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default AppFrame;
