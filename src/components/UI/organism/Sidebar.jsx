import React from "react";
import { NavbarMenu } from "../molecules";
import Footer from "./Footer";

const Sidebar = () => {
  return (
    <>
      <section className="py-4 px-8 w-[14rem] hidden lg:flex flex-col justify-between fixed z-10 inset-0 top-14 left-0 right-auto overflow-x-hidden overflow-y-auto font-semibold leading-6">
        {/* Top */}
        <div className="w-full h-full flex flex-col justify-between items-start">
          <NavbarMenu />
          <Footer />
        </div>
      </section>
    </>
  );
};

export default Sidebar;
