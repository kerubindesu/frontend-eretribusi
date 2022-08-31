import React from "react";
import { Link } from "react-router-dom";
import { image404 } from "../../../assets/images";
import { Heading, Image, TabTitle } from "../../UI/atoms";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const NotFound = () => {
  TabTitle("404");
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center overflow-hidden">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex flex-row justify-center items-center gap-4">
            <Image src={image404} alt={"logo"} variant="max-w-[4rem]" />
            <Heading text={"404"} variant={"px-2 text-5xl"} />
          </div>
          <div className="flex">
            <span className="text-slate-500">Halaman tidak ditemukan</span>
          </div>
          <Link className="mt-8" to="/">
            <span className="text-sky-500 flex flex-col items-center justify-center gap-2">
              <IoArrowBackCircleSharp className="text-3xl" />
              Beranda
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
