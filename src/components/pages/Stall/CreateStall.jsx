import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Button, Heading, TabTitle } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";
import { Alert } from "../../UI/organism";
import { createStall } from "../../../features/stalls/stallActions";
import Select from "react-select";
import { Spinner } from "flowbite-react";

const CreateStall = () => {
  TabTitle("Buat Kios/Loas");

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError } = useSelector((state) => state.stalls);

  const createData = {
    type,
    name,
    size,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createStall({
        createData,
        navigate,
      })
    );
  };

  const options = [
    { value: "kios", label: "KIOS" },
    { value: "los", label: "LOS" },
  ];

  return (
    <>
      <div>
        <div className="mb-8 flex items-center gap-4">
          <Link to={-1}>
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
              onChange={(e) => {
                setType(e.value);
              }}
              placeholder="Tipe retribusi..."
            />

            <div className="grid sm:grid-cols-2 gap-x-4">
              <FloatingLabel
                type={"text"}
                id={"name"}
                value={name}
                htmlFor={"name"}
                text={"Nomor"}
                onChange={(e) => setName(e.target.value)}
              />
              <FloatingLabel
                type={"text"}
                id={"size"}
                value={size}
                htmlFor={"size"}
                text={"Luas"}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-x-4">
              <Button
                disabled={isLoading}
                type={"submit"}
                variant={"bg-sky-400 hover:bg-sky-500 text-white"}
                text={!isLoading && "Buat"}
                icon={isLoading && <Spinner />}
              />
            </div>

            <div className="my-4 w-full">
              {isError && (
                <Alert
                  message={isError}
                  variant={"text-slate-500 border border-slate-300"}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateStall;
