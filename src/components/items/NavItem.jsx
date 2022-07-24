import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ to, action, variant, icon, text }) => {
  return (
    <>
      <li onClick={action} className={`${variant}`}>
        <Link to={to} className="flex gap-4 items-center">
          <span className="border p-1 rounded-lg shadow-sm">{icon}</span>
          <span>{text}</span>
        </Link>
      </li>
    </>
  );
};

export default NavItem;
