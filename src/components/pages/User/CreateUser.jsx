import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { Button, Heading, TabTitle } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";
import { Alert } from "../../UI/organism";
import { createUser } from "../../../features/users/userActions";
import { getBusinessTypes } from "../../../features/businessTypes/businessTypeActions";
import Select from "react-select";
import { BiArrowBack } from "react-icons/bi";
import { getRoles } from "../../../features/roles/roleActions";

const CreateUser = () => {
  TabTitle("Register Akun");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [business_type, setBusinessType] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isLoading, isError } = useSelector((state) => state.users);
  const { businessTypes } = useSelector((state) => state.businessTypes);
  const { roles } = useSelector((state) => state.roles);

  useEffect(() => {
    dispatch(getBusinessTypes({ q: "" }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRoles({ q: "" }));
  }, [dispatch]);

  const createData = {
    name,
    business_type,
    address,
    username: username?.toLowerCase(),
    role,
    password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser({ createData, navigate }));
  };

  const businessTypeOptions = businessTypes?.data?.map((item) => {
    return {
      value: item.name,
      label: item.name,
    };
  });

  const roleOptions = roles?.data?.map((item) => {
    return {
      value: item.name,
      label: item.name,
    };
  });

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
            <div className="grid sm:grid-cols-2 gap-x-4">
              <FloatingLabel
                type={"text"}
                text={"Nama Lengkap"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant={"border-b-0 rounded-t-lg"}
                htmlFor={"name"}
              />
              <FloatingLabel
                type={"text"}
                text={"Alamat"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                variant={"border-b-0 rounded-t-lg"}
                htmlFor={"address"}
              />
            </div>
            <Select
              className="mb-5"
              options={businessTypeOptions}
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
                setBusinessType(e.value);
              }}
              placeholder="Pilih jenis dagang ..."
            />
            <div className="grid sm:grid-cols-2 gap-x-4">
              <FloatingLabel
                type={"text"}
                text={"Username"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant={"border-b-0 rounded-t-lg"}
                htmlFor={"username"}
              />
              <FloatingLabel
                type={"password"}
                text={"Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                htmlFor={"password"}
              />
            </div>
            <Select
              className="mb-5"
              options={roleOptions}
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
                setRole(e.value);
              }}
              placeholder="Pilih role ..."
            />
            <div className="grid sm:grid-cols-2 gap-x-4">
              <Button
                disabled={isLoading}
                type={"submit"}
                variant={"mt-2 bg-sky-400 hover:bg-sky-500 text-white"}
                text={!isLoading && "Register"}
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

export default CreateUser;
