import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../../features/toggle/toggleMenuSlice";
import { CgMenu } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineLogout } from "react-icons/ai";
import { Image } from "../atoms";
import Logo from "../../../assets/images";
import Drawer from "./Drawer";

const Navbar = () => {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  return (
    <>
      <section className="navbar transition-all flex fixed top-0 right-0 left-0 lg:left-[16rem] font-semibold bg-white z-10">
        <div className="w-full px-4 lg:pl-0 h-14 flex items-center justify-between lg:justify-end">
          <div
            onClick={() => dispatch(update(true))}
            className="p-1 rounded-lg lg:hidden cursor-pointer hover:bg-gray-50 text-slate-600 hover:text-black"
          >
            <span className="sr-only">Menu navigation</span>
            <CgMenu className="text-lg" />
          </div>
          <div className="max-w-[16rem] px-2 flex items-center justify-start gap-2 lg:hidden text-lg text-slate-600 whitespace-nowrap">
            <Image src={Logo} alt="Logo" variant={"py-1 max-h-8"} />
            E-Retribusi
          </div>
          <div className="relative inline-block text-left">
            <div
              onClick={() => setDropdown(!dropdown)}
              className="text-slate-600 flex items-center justify-center cursor-pointer"
            >
              <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-2xl">
                <VscAccount />
              </div>
              <RiArrowDropDownLine />
            </div>

            <div
              className={`${
                dropdown ? "block" : "hidden"
              } absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                <div
                  className="flex px-4 py-2 bg-white text-sm text-gray-700 whitespace-nowrap overflow-hidden"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                >
                  <span>Mitsuha Miyamizu</span>
                  <div className="pr-4 px-1 absolute right-0 bg-white">...</div>
                </div>
                <form method="POST" action="#" role="none">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 flex gap-4 items-center hover:text-red-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-3"
                  >
                    <span className="border p-1 rounded-lg shadow-sm">
                      <AiOutlineLogout />
                    </span>
                    <span>Logout</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Drawer />
    </>
  );
};

export default Navbar;
