import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateToggle } from "../../../features/toggle/toggleMenuSlice";

const NavbarItem = ({ to, icon, text }) => {
  const dispatch = useDispatch();
  return (
    <>
      <NavLink
        to={to}
        className={(data) => (data.isActive ? "text-sky-400" : "text-gray-700")}
      >
        <li
          onClick={() => dispatch(updateToggle(false))}
          className="flex items-center gap-4 text-sm"
        >
          <span className="border p-1 rounded shadow-sm">{icon}</span>
          <span>{text}</span>
        </li>
      </NavLink>
    </>
  );
};

export default NavbarItem;
