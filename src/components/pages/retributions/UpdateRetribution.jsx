import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { retributionsSelector } from "../../../features/retributions/retributionsSlice";
import {
  updateRetribution,
  getRetributions,
} from "../../../features/retributions/retributionsActions";
import { Button, Heading, TabTitle } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";

const UpdateRetribution = () => {
  TabTitle("Edit Retribusi");
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

  const handleSubmit = async (e) => {
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
      <div className="">
        <Heading text={document.title} variant={"mb-8 text-start"} />
        <form
          onSubmit={handleSubmit}
          className="grid grid-flow-row-dense grid-cols-3 grid-rows-1 gap-4"
        >
          <div className="col-span-3 sm:col-span-2">
            <div className="grid sm:grid-cols-2 gap-x-4">
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
            <div className="grid sm:grid-cols-2 gap-x-4">
              <Button
                type={"submit"}
                variant={"bg-sky-400 hover:bg-sky-500 text-white"}
                text={"Update"}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateRetribution;
