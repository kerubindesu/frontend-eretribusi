import React from "react";
import { Link } from "react-router-dom";
import { image404 } from "../../../assets/images";
import { Heading, Image, TabTitle } from "../../UI/atoms";

const NotFound = () => {
  TabTitle("404");
  return (
    <>
      <div className="fixed inset-0 flex flex-col items-center justify-center cursor-text">
        <Image src={image404} alt={"logo"} variant="max-w-[8rem]" />
        <Heading text={"404"} variant={"text-5xl lg:text-8xl"} />
        <div className="text-slate-400 text-semibold flex flex-col items-end">
          <span>Kesalahan, halaman tidak ditemukan :(</span>
          <Link to="/">
            <span className="text-sky-500 underline text-end">
              Kembali ke beranda
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
