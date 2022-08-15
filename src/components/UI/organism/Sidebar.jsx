import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { NavbarMenu } from "../molecules";

const Sidebar = () => {
  useEffect(() => {
    const sa = ScrollReveal({
      origin: "left",
      distance: "5rem",
      duration: 720,
      reset: false,
    });
    sa.reveal(`.sidebar, .sidebar-menu>ul>li`, {
      opacity: 0,
      interval: 80,
    });
  });
  return (
    <>
      <section className="py-4 px-8 w-[14rem] hidden lg:flex flex-col justify-between fixed z-10 inset-0 top-14 left-0 right-auto overflow-x-hidden overflow-y-auto font-semibold leading-6">
        {/* Top */}
        <div className="w-full flex flex-col gap-6">
          {/* Logo */}
          <div className="sidebar-menu flex items-start justify-start">
            <NavbarMenu />
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
