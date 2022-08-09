import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../../features/toggle/toggleMenuSlice";
import { CgClose } from "react-icons/cg";
import { NavbarMenu } from "../molecules";

const Drawer = () => {
  const toggleStatus = useSelector((state) => state.toggleMenu.toggleStatus);
  const dispatch = useDispatch();
  return (
    <>
      <div className={toggleStatus ? "block lg:hidden nav-menu" : "hidden"}>
        <div
          onClick={() => dispatch(update(false))}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
          aria-hidden="true"
        ></div>
        {/* Links */}
        <div className="w-80 max-w-[calc(100%-3rem) p-4 flex-1 z-10 fixed top-0 h-screen bg-white flex flex-col items-start justify-between text-sm font-semibold">
          <div
            onClick={() => dispatch(update(false))}
            className="absolute z-10 top-4 right-5 p-1 cursor-pointer flex items-center justify-center rounded-lg text-slate-600 hover:text-black hover:bg-gray-50"
          >
            <span className="sr-only">Close navigation</span>
            <CgClose className="text-lg" />
          </div>
          {/* Menu */}
          <div className="nav-items mb-4 flex items-start justify-start overflow-x-hidden overflow-y-auto snap-none">
            <NavbarMenu />
          </div>
          {/* End Menu */}
        </div>
        {/* End Links */}
      </div>
    </>
  );
};

export default Drawer;
