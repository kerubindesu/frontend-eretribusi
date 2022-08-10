import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Heading } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";
import { saveRetribution } from "../../../features/retributions/retributionsSlice";
import { IoSaveOutline } from "react-icons/io5";

const AddRetribution = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createRetribution = async (e) => {
    e.preventDefault();
    try {
      await dispatch(saveRetribution({ name, address }));
      navigate("/retributions");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="bg-white">
        <form
          onSubmit={createRetribution}
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
                id={"address"}
                value={address}
                htmlFor={"address"}
                text={"Alamat"}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="text-end col-span-3 lg:col-span-1">
            <Button
              type={"submit"}
              variant={"bg-sky-400 hover:bg-sky-500 text-white"}
              icon={<IoSaveOutline />}
              text={"Simpan"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRetribution;
