import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Button, Heading, TabTitle } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";
import { Alert } from "../../UI/organism";
import { createBusinessType } from "../../../features/businessTypes/businessTypesActions";
import { Spinner } from "flowbite-react";

const CreateBusinessType = () => {
  TabTitle("Buat Data Jenis Usaha");

  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError } = useSelector((state) => state.businessTypes);

  const createData = {
    name,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createBusinessType({
        createData,
        navigate,
      })
    );
  };

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
          <div className="col-span-3 sm:col-span-1">
            <FloatingLabel
              type={"text"}
              id={"name"}
              value={name}
              htmlFor={"name"}
              text={"Nama Jenis Dagang"}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-span-3 sm:col-span-1">
            <Button
              disabled={isLoading}
              type={"submit"}
              variant={"bg-sky-400 hover:bg-sky-500 text-white"}
              text={!isLoading && "Tambahkan"}
              icon={isLoading && <Spinner />}
            />
          </div>
          <div className="col-span-3 sm:col-span-2">
            {isError && (
              <Alert
                message={isError.data}
                variant={"text-orange-700 bg-red-100 border border-orange-700"}
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateBusinessType;
