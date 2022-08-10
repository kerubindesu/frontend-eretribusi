import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Heading } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";
import {
  retributionsSelector,
  updateRetribution,
  getRetributions,
} from "../../../features/retributions/retributionsSlice";

const EditRetribution = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const retribution = useSelector((state) =>
    retributionsSelector.selectById(state, id)
  );

  useEffect(() => {
    dispatch(getRetributions());
  }, [dispatch]);

  useEffect(() => {
    if (retribution) {
      setName(retribution.name);
      setAddress(retribution.address);
    }
  }, [retribution]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateRetribution({ id, name, address }));
      navigate("/retributions");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="bg-white">
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
              text={"Update"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditRetribution;
