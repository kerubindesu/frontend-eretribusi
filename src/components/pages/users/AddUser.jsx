import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { Button } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";
import { saveUser } from "../../../features/users/usersSlice";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await dispatch(saveUser({ name, email, gender }));
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        id="usercreate-modal"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex bg-black/20 backdrop-blur"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-4 w-full max-w-md h-full">
          <div className="relative overflow-y-auto bg-white rounded-lg shadow dark:bg-gray-700">
            <Link to="/users">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="usercreate-modal z-10"
              >
                <CgClose className="text-xl" />
                <span className="sr-only">Close modal</span>
              </button>
            </Link>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Tambah user baru
              </h3>
              <form
                onSubmit={createUser}
                className="space-y-6 modal"
                action="#"
              >
                <FloatingLabel
                  type={"text"}
                  id={"name"}
                  value={name}
                  htmlFor={"name"}
                  text={"Nama lengkap"}
                  onChange={(e) => setName(e.target.value)}
                />
                <FloatingLabel
                  type={"text"}
                  id={"email"}
                  value={email}
                  htmlFor={"email"}
                  text={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FloatingLabel
                  type={"text"}
                  id={"gender"}
                  value={gender}
                  htmlFor={"gender"}
                  text={"Gender"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <Button
                  type={"submit"}
                  variant={"bg-sky-400 text-white"}
                  name={"Save"}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
