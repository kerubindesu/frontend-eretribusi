import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateToggle } from "../../../features/toggle/toggleMenuSlice";
import { CgMenu } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { Image } from "../atoms";
import { Logo } from "../../../assets/images";
import Drawer from "./Drawer";
import { Spinner } from "flowbite-react";
import jwt_decode from "jwt-decode";
import { logOut } from "../../../features/auth/authActions";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const [userAuth, setUserAuth] = useState(null);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setUserAuth(decoded.UserInfo);
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logOut(navigate));
  };

  return (
    <>
      <section className="fixed inset-0 bottom-auto font-semibold bg-white/75 z-10 backdrop-blur">
        <div className="px-4 lg:pr-8 lg:pl-0 w-full h-14 flex items-center justify-between">
          <div className="w-max lg:hidden">
            <div
              onClick={() => dispatch(updateToggle(true))}
              className="rounded cursor-pointer text-slate-600 hover:text-black"
            >
              <span className="sr-only">Menu navigation</span>
              <CgMenu className="text-2xl" />
            </div>
          </div>
          <Link to={"/"}>
            <div className="px-8 lg:w-[14rem] flex items-center gap-2 text-lg text-slate-600 whitespace-nowrap">
              <Image src={Logo} alt="Logo" variant={"py-1 max-h-6"} />
              <span className="text-xl">iRetribusi</span>
            </div>
          </Link>
          <div className="w-max relative text-left">
            {userAuth && (
              <>
                <div
                  onClick={() => setDropdown(!dropdown)}
                  className="flex items-center justify-center text-slate-600 whitespace-nowrap cursor-pointer"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    {Array.from(`${userAuth.name}`)[0]}
                  </div>
                  <span className="sr-only">Dropdown logout</span>
                </div>
                <div
                  className={`${dropdown ? "block" : "hidden"
                    } mt-2 p-2 absolute right-0 w-56 flex flex-col gap-2 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                >
                  <div
                    className="p-2 flex justify-start items-center gap-2 border rounded box-border shadow-md overflow-hidden whitespace-nowrap text-slate-800 text-sm"
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {Array.from(`${userAuth.name}`)[0]}
                    </div>
                    <span className="box-border text-ellipsis overflow-hidden">
                      {userAuth.name}
                    </span>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <button
                      type="submit"
                      className="w-full py-2 flex gap-2 items-center text-left text-sm text-black hover:text-gray-700"
                    >
                      <span className="h-8 w-8 rounded-md flex items-center justify-center bg-white border shadow-sm">
                        <AiOutlineLogout />
                      </span>
                      <span>Logout</span>
                    </button>
                  </form>
                </div>
              </>
            )}
            {!userAuth && (
              <Link to={"/auth"}>
                <div className="h-8 w-8 rounded-full flex items-center justify-center">
                  <Spinner size="md" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      <Drawer />
    </>
  );
};

export default Navbar;
