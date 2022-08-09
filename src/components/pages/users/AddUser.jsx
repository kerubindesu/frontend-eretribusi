import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Heading } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";
import { saveUser } from "../../../features/users/usersSlice";
import { MdOutlineSave } from "react-icons/md";

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
      <div className="bg-white">
        <form
          onSubmit={createUser}
          className="grid grid-flow-row-dense grid-cols-3 grid-rows-1 gap-4"
        >
          <div className="px-4 col-span-3 lg:col-span-2">
            <Heading text={"Edit User"} variant="text-xl mb-4 lg:mb-8" />
            <div className="grid lg:grid-cols-2 gap-4">
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
            </div>
          </div>
          <div className="text-end col-span-3 lg:col-span-1">
            <Button
              type={"submit"}
              variant={"bg-sky-400 hover:bg-sky-500 text-white"}
              icon={<MdOutlineSave />}
              text={"Save"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser;
