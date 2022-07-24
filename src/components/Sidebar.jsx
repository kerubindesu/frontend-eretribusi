import React, { useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import ScrollReveal from "scrollreveal";
import { Image } from "./items";
import Logo from "../assets/images";
import NavMenu from "./items/NavMenu";

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
      <section className="sidebar hidden lg:flex flex-col justify-between fixed z-20 inset-0 left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pt-8 pb-10 px-8 overflow-x-hidden overflow-y-auto text-sm font-semibold leading-6">
        {/* Top */}
        <div className="w-full flex flex-col gap-8">
          {/* Logo */}
          <div className="w-full flex items-center justify-start gap-2 rounded text-xl text-slate-600 bg-gradient-to-r from-white to-sky-100">
            <Image src={Logo} alt="Logo" variant={"py-1 max-h-8"} />
            E-Retribusi
          </div>
          <div className="sidebar-menu flex items-start justify-start">
            <NavMenu />
          </div>
          {/* End Links */}
        </div>
        <div>
          <a href="/#" className="flex gap-4 items-center hover:text-red-700">
            <span className="border p-1 rounded-lg shadow-sm">
              <AiOutlineLogout />
            </span>
            <span>Logout</span>
          </a>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
