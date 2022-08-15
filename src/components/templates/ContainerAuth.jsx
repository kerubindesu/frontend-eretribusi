import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/images";
import { Image } from "../UI/atoms";
import { Footer } from "../UI/organism";

const ContainerAuth = () => {
  return (
    <>
      <div className="p-4 lg:p-8 w-screen min-h-screen flex flex-col items-center justify-between bg-white overflow-x-hidden">
        <div className="w-full sm:max-w-sm flex-1 flex flex-col justify-center gap-8">
          <Image
            src={Logo}
            alt="logo"
            variant={"w-1/4 md:1/5 mb-2 mx-auto object-cover"}
          />
          <div className="p-4 sm:p-8">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ContainerAuth;
