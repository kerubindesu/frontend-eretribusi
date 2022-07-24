import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, Navbar, Sidebar } from "../components";

const MainApp = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="lg:mt-8 px-4 lg:pl-[19.5rem] overflow-x-hidden">
        <Header />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainApp;
