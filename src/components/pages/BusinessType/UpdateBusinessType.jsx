import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Button, Heading, TabTitle } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";
import { Spinner } from "flowbite-react";
import { Alert } from "../../UI/organism";
import { RandomString } from "../../../config/RandomString";
import {
  getBusinessType,
  updateBusinessType,
} from "../../../features/businessTypes/businessTypeActions";

const UpdateBusinessType = () => {
  TabTitle("Edit Kios/Los");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [name, setName] = useState("");

  const { isLoading, isError, businessType } = useSelector(
    (state) => state.businessTypes
  ); // payload

  useEffect(() => {
    dispatch(getBusinessType(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (businessType) {
      setName(businessType.name);
    }
  }, [businessType]);

  const updateData = {
    name,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateBusinessType({
        id: id,
        updateData,
        navigate,
      })
    );
  };

  if (isError.status === 404) {
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
                text={!isLoading && "Update"}
                icon={isLoading && <Spinner />}
              />
            </div>
            <div className="col-span-3 sm:col-span-2">
              {isError && (
                <Alert
                  message={isError}
                  variant={"text-slate-500 border border-slate-300"}
                />
              )}
            </div>
          </form>
        </div>
      </>
    );
  }
};

export default UpdateBusinessType;
