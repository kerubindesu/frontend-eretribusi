import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/images";
import { Image } from "../UI/atoms";
import { Footer } from "../UI/organism";

const AuthFrame = () => {
  return (
    <>
      <div className="p-4 lg:p-8 w-screen min-h-screen flex flex-col items-center justify-between overflow-x-hidden">
        <div className="w-full md:w-1/2 lg:w-1/3 flex-1 flex flex-col items-start justify-center">
          <Image
            src={Logo}
            alt="logo"
            variant={"w-1/4 md:1/5 mb-2 mx-auto object-cover"}
          />
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AuthFrame;
