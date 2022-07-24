import React, { useState } from "react";
import { GoDashboard, GoCreditCard } from "react-icons/go";
import { AiOutlineLineChart } from "react-icons/ai";
import { MdPeopleOutline } from "react-icons/md";
import { NavItem } from "./index";

const NavMenu = ({ action }) => {
  const [linkActive, setLinkActive] = useState(null);
  return (
    <>
      <ul onClick={action} className="flex flex-col gap-4">
        <NavItem
          to={"/"}
          action={() => setLinkActive("Dashboard")}
          variant={
            linkActive === "Dashboard" ? "text-sky-400" : "text-gray-700"
          }
          icon={<GoDashboard />}
          text={"Dashboard"}
        />
        <NavItem
          to={"penjual"}
          action={() => setLinkActive("Penjual")}
          variant={linkActive === "Penjual" ? "text-sky-400" : "text-gray-700"}
          icon={<MdPeopleOutline />}
          text={"Penjual"}
        />
        <NavItem
          to={"analytics"}
          action={() => setLinkActive("Analisis")}
          variant={linkActive === "Analisis" ? "text-sky-400" : "text-gray-700"}
          icon={<AiOutlineLineChart />}
          text={"Analisis"}
        />
        <NavItem
          to={"retribusi"}
          action={() => setLinkActive("Retribusi")}
          variant={
            linkActive === "Retribusi" ? "text-sky-400" : "text-gray-700"
          }
          icon={<GoCreditCard />}
          text={"Retribusi"}
        />
      </ul>
    </>
  );
};

export default NavMenu;
