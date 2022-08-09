import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import { Image } from "../atoms";
import Logo from "../../../assets/images";
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
      <section className="sidebar pt-3.5 pb-8 px-8 w-[16rem] hidden lg:flex flex-col justify-between fixed z-10 inset-0 left-[max(0px,calc(50%-45rem))] right-auto overflow-x-hidden overflow-y-auto text-sm font-semibold leading-6">
        {/* Top */}
        <div className="w-full flex flex-col gap-6">
          {/* Logo */}
          <div className="w-full flex items-center justify-start gap-2 text-xl text-slate-600">
            <Image src={Logo} alt="Logo" variant={"py-1 max-h-8"} />
            E-Retribusi
          </div>
          <div className="sidebar-menu flex items-start justify-start">
            <NavbarMenu />
          </div>
          {/* End Links */}
        </div>
      </section>
    </>
  );
};

export default Sidebar;
