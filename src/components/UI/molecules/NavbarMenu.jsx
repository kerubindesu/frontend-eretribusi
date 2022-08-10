import React from "react";
import { useDispatch } from "react-redux";
import { update } from "../../../features/toggle/toggleMenuSlice";
import { GoDashboard, GoCreditCard } from "react-icons/go";
import { AiOutlineLineChart } from "react-icons/ai";
import { MdPeopleOutline } from "react-icons/md";
import { NavbarItem } from "../atoms";

const NavbarMenu = () => {
  const dispatch = useDispatch();
  return (
    <>
      <ul
        onClick={() => dispatch(update(false))}
        className="flex flex-col gap-8"
      >
        <NavbarItem to={"/"} icon={<GoDashboard />} text={"Dashboard"} />
        <NavbarItem to={"users"} icon={<MdPeopleOutline />} text={"Users"} />
        <NavbarItem
          to={"analytics"}
          icon={<AiOutlineLineChart />}
          text={"Analisis"}
        />
        <NavbarItem
          to={"retributions"}
          icon={<GoCreditCard />}
          text={"Retribusi"}
        />
      </ul>
    </>
  );
};

export default NavbarMenu;
