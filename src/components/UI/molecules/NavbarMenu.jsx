import React from "react";
import { GoDashboard, GoCreditCard } from "react-icons/go";
import { AiOutlineLineChart } from "react-icons/ai";
import { MdPeopleOutline } from "react-icons/md";
import { NavbarItem } from "../atoms";

const NavbarMenu = () => {
  return (
    <>
      <ul className="flex flex-col gap-8">
        <NavbarItem to={"/"} icon={<GoDashboard />} text={"Dashboard"} />
        <NavbarItem
          to={"retributions"}
          icon={<GoCreditCard />}
          text={"Retribusi"}
        />
        <NavbarItem to={"users"} icon={<MdPeopleOutline />} text={"Users"} />
        <NavbarItem
          to={"analytics"}
          icon={<AiOutlineLineChart />}
          text={"Analisis"}
        />
      </ul>
    </>
  );
};

export default NavbarMenu;
