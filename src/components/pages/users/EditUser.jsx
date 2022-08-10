// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button, Heading } from "../../UI/atoms";
// import { FloatingLabel } from "../../UI/molecules";
// import {
//   usersSelector,
//   updateUser,
//   getUsers,
// } from "../../../features/users/usersSlice";

const EditUser = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [gender, setGender] = useState("");
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { id } = useParams();

  // const user = useSelector((state) => usersSelector.selectById(state, id));

  // useEffect(() => {
  //   dispatch(getUsers());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     setName(user.name);
  //     setEmail(user.email);
  //     setGender(user.gender);
  //   }
  // }, [user]);

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await dispatch(updateUser({ id, name, email, gender }));
  //     navigate("/users");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      {/* <div className="bg-white">
        <form
          onSubmit={handleUpdate}
          className="grid grid-flow-row-dense grid-cols-3 grid-rows-1 gap-4"
        >
          <div className="px-4 col-span-3 lg:col-span-2">
            <Heading text={"Edit User"} variant="text-xl mb-4 lg:mb-8" />
            <div className="grid grid-flow-row-dense lg:grid-cols-2 gap-4">
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
              text={"Update"}
            />
          </div>
        </form>
      </div> */}
    </>
  );
};

export default EditUser;
