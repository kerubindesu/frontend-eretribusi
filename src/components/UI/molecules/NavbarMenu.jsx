import React from "react";
import { GoDashboard, GoCreditCard } from "react-icons/go";
import { AiOutlineLineChart } from "react-icons/ai";
import { MdPeopleOutline } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import { RiBillLine } from "react-icons/ri";
import { NavbarItem } from "../atoms";

const NavbarMenu = () => {
  return (
    <>
      <ul className="flex flex-col gap-6 text-sm">
        <NavbarItem to={"/"} icon={<GoDashboard />} text={"Dashboard"} />
        <NavbarItem to={"bills"} icon={<RiBillLine />} text={"Tagihan"} />
        <NavbarItem
          to={"invoices"}
          icon={<TbFileInvoice />}
          text={"Invoices"}
        />
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
        <li>
          Master Data
          <ul className="py-2 font-normal">
            <NavbarItem to={"type-of-business"} text={"Jenis dagang"} />
            <NavbarItem to={"stalls"} text={"Los dan kios"} />
            <NavbarItem to={"roles"} text={"Role"} />
          </ul>
        </li>
      </ul>
    </>
  );
};

export default NavbarMenu;
