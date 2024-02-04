import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Button, Heading, TabTitle } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";
import Select from "react-select";
import { Spinner } from "flowbite-react";
import { Alert } from "../../UI/organism";
import { RandomString } from "../../../config/RandomString";
import { getStall, updateStall } from "../../../features/stalls/stallActions";

const UpdateStall = () => {
  TabTitle("Edit Kios/Los");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");

  const { isLoading, isError, stall } = useSelector((state) => state.stalls); // payload

  useEffect(() => {
    dispatch(getStall(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (stall) {
      setType(stall.type);
      setName(stall.name);
      setSize(stall.size);
    }
  }, [stall]);

  const updateData = {
    type,
    name,
    size,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateStall({
        id: id,
        updateData,
        navigate,
      })
    );
  };
  console.log(type)

  const options = [
    { value: "kios", label: "KIOS" },
    { value: "los", label: "LOS" },
  ];

  if (isError === "Data tidak ditemukan") {
    const randomString = RandomString(128);
    TabTitle(randomString);

    return navigate(`/${randomString}`);
  } else {
    return (
      <>
        <div>
          <div className="mb-8 flex items-center gap-4">
            <Link to={-1}>
              <BiArrowBack />
            </Link>
            <Heading text={`${document.title}`} variant={"text-start"} />
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
                  option.value === type ? option : ""
                )}
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
                  text={"Kode"}
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
                  text={!isLoading && "Update"}
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
        </div >
      </>
    );
  }
};

export default UpdateStall;
