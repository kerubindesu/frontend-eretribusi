import React from "react";
import Logo from "../../../assets/images";
import { Heading, Image, TabTitle } from "../../UI/atoms";

const NotFound = () => {
  TabTitle("404");
  return (
    <>
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <Image src={Logo} alt={"logo"} variant="max-w-[8rem]" />
        <Heading text={"404"} variant={"text-5xl lg:text-8xl"} />
        <p className="text-slate-400 text-semibold">Page not found</p>
      </div>
    </>
  );
};

export default NotFound;
