import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToggle } from "../../../features/toggle/toggleMenuSlice";
import { logout } from "../../../features/auth/authSlice";
import { CgMenu } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineLogout } from "react-icons/ai";
import { Image } from "../atoms";
import Logo from "../../../assets/images";
import Drawer from "./Drawer";
import { getUserAuth } from "../../../features/auth/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const { userToken, userAuth } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.location.reload();
  };

  useEffect(() => {
    if (userToken) {
      dispatch(getUserAuth());
    }
  }, [userToken, dispatch]);

  return (
    <>
      <section className="fixed inset-0 bottom-auto font-semibold bg-white/75 z-10 backdrop-blur">
        <div className="px-4 lg:pr-8 lg:pl-0 w-full h-14 flex items-center justify-between">
          <div className="w-[3rem] lg:hidden">
            <div
              onClick={() => dispatch(updateToggle(true))}
              className="w-max rounded cursor-pointer text-slate-600 hover:text-black"
            >
              <span className="sr-only">Menu navigation</span>
              <CgMenu className="text-2xl" />
            </div>
          </div>
          <Link to={"/"}>
            <div className="px-8 lg:w-[14rem] flex items-center gap-2 text-lg text-slate-600 whitespace-nowrap">
              <Image src={Logo} alt="Logo" variant={"py-1 max-h-8"} />
              E-Retribusi
            </div>
          </Link>
          <div className="w-[3rem] relative inline-block text-left">
            {userAuth && (
              <div
                onClick={() => setDropdown(!dropdown)}
                className="text-slate-600 flex items-center justify-center cursor-pointer"
              >
                <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-2xl">
                  <VscAccount className="text-2xl" />
                </div>
                <RiArrowDropDownLine />
                <span className="sr-only">Dropdown logout</span>
              </div>
            )}
            {userAuth && (
              <div
                className={`${
                  dropdown ? "block" : "hidden"
                } absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  <div
                    className="flex px-4 py-2 bg-white text-gray-700 whitespace-nowrap overflow-hidden text-sm"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    <span>{userAuth.name}</span>
                    <div className="pr-4 px-1 absolute right-0 bg-white">
                      ...
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-left text-gray-700 flex gap-4 items-center hover:text-red-700 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-3"
                    >
                      <span className="border p-1 rounded shadow-sm">
                        <AiOutlineLogout />
                      </span>
                      <span>Logout</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
            {!userAuth && <Link to={"/auth"}>Login</Link>}
          </div>
        </div>
      </section>

      <Drawer />
    </>
  );
};

export default Navbar;
