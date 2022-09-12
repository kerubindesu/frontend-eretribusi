import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Button, Heading, TabTitle } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";
import {
  getRetribution,
  updateRetribution,
} from "../../../features/retributions/retributionsActions";
import Select from "react-select";

const UpdateRetribution = () => {
  TabTitle("Edit Retribusi");

  const [stall_type, setStallType] = useState("");
  const [stall_name, setStallName] = useState("");
  const [stall_size, setStallSize] = useState("");
  const [commerce_type, setCommerceType] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("ini id", id);

  const { loading, error, success, retributions } = useSelector(
    (state) => state.retributions
  );

  useEffect(() => {
    id && dispatch(getRetribution({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    // setStallType(retributions.stall.type);
    // setStallName(retributions.stall.name);
    // setStallSize(retributions.stall.size);
    setName(retributions.person.name);
    setCommerceType(retributions.person.commerce_type);
    setAddress(retributions.person.address);
  }, [retributions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        updateRetribution({
          id,
          stall_type,
          stall_name,
          stall_size,
          commerce_type,
          name,
          address,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const options = [
    { value: "KIOS", label: "KIOS" },
    { value: "LOS", label: "LOS" },
  ];

  return (
    <>
      <div>
        <div className="mb-8 flex items-center gap-4">
          <Link to="/retributions">
            <BiArrowBack />
          </Link>
          <Heading text={document.title} variant={"text-start"} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-flow-row-dense grid-cols-2 md:grid-cols-3 grid-rows-1 gap-4"
        >
          <div className="col-span-3 sm:col-span-2">
            <Select
              className="mb-5"
              options={options}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "#f0f9ff",
                  primary: "#38bdf8",
                },
              })}
              styles={{
                input: (base) => ({
                  ...base,
                  "input: focus": {
                    boxShadow: "none",
                  },
                }),
              }}
              value={options.map((option, index) =>
                option.value === stall_type ? option : ""
              )}
              onChange={(e) => {
                setStallType(e.value);
              }}
              placeholder="Tipe retribusi..."
            />

            <div className="grid sm:grid-cols-2 gap-x-4">
              <FloatingLabel
                type={"text"}
                id={"stall_name"}
                value={stall_name}
                htmlFor={"stall_name"}
                text={"Nomor"}
                onChange={(e) => setStallName(e.target.value)}
              />
              <FloatingLabel
                type={"number"}
                id={"stall_size"}
                value={stall_size}
                htmlFor={"stall_size"}
                text={"Luas"}
                onChange={(e) => setStallSize(e.target.value)}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-x-4">
              <FloatingLabel
                type={"text"}
                id={"commerce_type"}
                value={commerce_type}
                htmlFor={"commerce_type"}
                text={"Jenis Dagang"}
                onChange={(e) => setCommerceType(e.target.value)}
              />
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
                text={"Perbarui"}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateRetribution;
