import React from "react";
import Logo from "../assets/images";
import { Heading, Image } from "../components/items";

const NotFound = () => {
  return (
    <>
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <Image src={Logo} alt={"logo"} variant="w-1/3 md:w-1/5 lg:w-1/6" />
        <Heading text={"404"} variant={"text-5xl md:text-7xl lg:text-8xl"} />
        <p className="text-sm text-slate-400 text-semibold">Page not found</p>
      </div>
    </>
  );
};

export default NotFound;
