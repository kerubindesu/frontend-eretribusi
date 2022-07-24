import React, { useState } from "react";
import { CgMenu, CgClose } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { Image } from "./items";
import Logo from "../assets/images";
import NavMenu from "./items/NavMenu";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <>
      <section className="navbar transition-all flex lg:hidden sticky top-0 font-semibold">
        <div className="w-screen px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="max-w-[12rem] pr-2 flex items-center justify-start gap-2 rounded text-lg text-slate-600 bg-gradient-to-r from-white to-sky-100 whitespace-nowrap">
            <Image src={Logo} alt="Logo" variant={"py-1 max-h-8"} />
            E-Retribusi
          </div>
          {/* End Logo - Menu Toggle */}
          <button
            onClick={() => setToggleMenu(!toggleMenu)}
            type="button"
            className="p-1 rounded-lg hover:bg-gray-50 text-slate-600 hover:text-black"
          >
            <span className="sr-only">Menu navigation</span>
            <CgMenu className="text-lg" />
          </button>
          {/* End Menu Toggle - Links */}
        </div>
      </section>

      <div className={toggleMenu ? "block lg:hidden nav-menu" : "hidden"}>
        <div
          onClick={() => setToggleMenu(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          aria-hidden="true"
        ></div>
        {/* Links */}
        <div className="w-80 max-w-[calc(100%-3rem) p-4 flex-1 z-50 fixed top-0 h-screen bg-white flex flex-col items-start justify-between text-sm font-semibold">
          <button
            onClick={() => setToggleMenu(false)}
            type="button"
            className="absolute z-10 top-4 right-5 p-1 flex items-center justify-center rounded-lg text-slate-600 hover:text-black hover:bg-gray-50"
          >
            <span className="sr-only">Close navigation</span>
            <CgClose className="text-lg" />
          </button>
          {/* Menu */}
          <div className="nav-items mb-4 flex items-start justify-start overflow-x-hidden overflow-y-auto snap-none">
            <NavMenu action={() => setToggleMenu(false)} />
          </div>
          {/* End Menu */}
          <div className="p-4">
            <a href="/#" className="flex gap-4 items-center hover:text-red-700">
              <span className="border p-1 rounded-lg shadow-sm">
                <AiOutlineLogout />
              </span>
              <span>Logout</span>
            </a>
          </div>
        </div>
        {/* End Links */}
      </div>
    </>
  );
};

export default Navbar;
