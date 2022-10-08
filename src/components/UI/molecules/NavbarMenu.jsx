import React, { useState, useEffect } from "react";
import { GoDashboard, GoCreditCard } from "react-icons/go";
import { MdPeopleOutline } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import { RiBillLine } from "react-icons/ri";
import { NavbarItem } from "../atoms";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

const NavbarMenu = () => {
  const [userAuth, setUserAuth] = useState(null);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setUserAuth(decoded.UserInfo);
    }
  }, [token]);

  return (
    <>
      <ul className="flex flex-col gap-6 text-sm">
        <NavbarItem to={"/"} icon={<GoDashboard />} text={"Dashboard"} />
        <NavbarItem
          to={"invoices"}
          icon={<TbFileInvoice />}
          text={"Invoices"}
        />
        <NavbarItem to={"bills"} icon={<RiBillLine />} text={"Tagihan"} />

        {/* Admin access */}
        {userAuth?.role === "Admin" && (
          <>
            <NavbarItem
              to={"retributions"}
              icon={<GoCreditCard />}
              text={"Retribusi"}
            />
            <NavbarItem
              to={"users"}
              icon={<MdPeopleOutline />}
              text={"Pengguna"}
            />
            <li>
              Master Data
              <ul className="py-2 font-normal">
                <NavbarItem to={"type-of-business"} text={"Jenis dagang"} />
                <NavbarItem to={"stalls"} text={"Los dan kios"} />
                <NavbarItem to={"roles"} text={"Role"} />
              </ul>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default NavbarMenu;
