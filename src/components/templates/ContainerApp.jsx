import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "../UI/organism";

const ContainerApp = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="mt-14 p-4 lg:pr-8 lg:pl-[14.5rem] min-h-screen flex flex-col justify-between overflow-hidden text-sm">
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default ContainerApp;
