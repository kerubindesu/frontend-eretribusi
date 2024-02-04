import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { Navbar, Sidebar } from "../UI/organism";

const Main = () => {
  const toggleStatus = useSelector((state) => state.toggleMenu.toggleStatus);
  const showModal = useSelector((state) => state.modal.showModal);

  if (toggleStatus || showModal) {
    disableBodyScroll(document);
  } else {
    enableBodyScroll(document);
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="pt-16 p-4 lg:pr-8 lg:pl-[14rem] min-h-screen flex flex-col justify-between overflow-hidden text-sm">
        <Outlet />
      </div>
    </>
  );
};

export default Main;
