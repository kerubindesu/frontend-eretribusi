import React from "react";
import { NavLink } from "react-router-dom";

const NavbarItem = ({ to, icon, text }) => {
  return (
    <>
      <NavLink
        to={to}
        className={(data) => (data.isActive ? "text-sky-400" : "text-gray-700")}
      >
        <li className="flex items-center gap-4">
          <span className="border p-1 rounded-lg shadow-sm">{icon}</span>
          <span>{text}</span>
        </li>
      </NavLink>
    </>
  );
};

export default NavbarItem;
