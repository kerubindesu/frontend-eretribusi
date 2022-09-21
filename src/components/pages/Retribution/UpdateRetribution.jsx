import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Button, Heading, TabTitle } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";
import { Alert } from "../../UI/organism";
import {
  getRetributionById,
  updateRetribution,
} from "../../../features/retributions/retributionsActions";
import {
  getStalls,
  getStallById,
} from "../../../features/stalls/stallsActions";
import { getBusinessTypes } from "../../../features/businessTypes/businessTypesActions";
import Select from "react-select";
import { Spinner } from "flowbite-react";
import { RandomString } from "../../../config";

const UpdateRetribution = () => {
  TabTitle("Edit Retribusi");

  const { id } = useParams();
  const [stall_id, setStallId] = useState(null);
  const [stall_size, setStallSize] = useState("");
  const [stall_cost, setStallCost] = useState("");
  const [waste_cost, setWasteCost] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [business_type, setBusinessType] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, retribution } = useSelector(
    (state) => state.retributions
  );
  const { stalls, stall } = useSelector((state) => state.stalls);
  const { businessTypes } = useSelector((state) => state.businessTypes);

  useEffect(() => {
    dispatch(getRetributionById(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getStalls({ q: "" }));
  }, [dispatch]);

  useEffect(() => {
    stall_id && dispatch(getStallById(stall_id));
  }, [dispatch, stall_id]);

  useEffect(() => {
    dispatch(getBusinessTypes({ q: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (retribution) {
      setStallId(retribution.stall._id);
      setStallSize(retribution.stall.size);
      setStallCost(retribution.stall.stall_cost);
      setWasteCost(retribution.stall.waste_cost);
      setUsername(retribution.user.username);
      setName(retribution.user.name);
      setAddress(retribution.user.address);
      setBusinessType(retribution.user.business_type);
    }
  }, [retribution]);

  useEffect(() => {
    if (stall) {
      setStallSize(stall.size);
      setStallCost(`Rp ${stall.stall_cost}`);
      setWasteCost(
        `Rp ${stall.waste_cost} ${stall.type === "kios" ? "(perbulan)" : ""}`
      );
      setUsername(
        `user_${stall.name.toLowerCase()}${stall.type.toLowerCase()}`
      );
      setPassword(`passWord2022!`);
    }

    if (!stall_id) {
      setStallSize("");
      setStallCost("");
      setWasteCost("");
      setUsername("");
      setPassword("");
    }
  }, [stall, stall_id]);

  const updateData = {
    stall_id: stall_id,
    name,
    business_type,
    address,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateRetribution({
        id: id,
        updateData,
        navigate,
      })
    );
  };

  const stallOptions =
    stalls &&
    stalls.data.map((item) => {
      return {
        value: item._id,
        label: `${item.type.toUpperCase()} ${item.name}`,
      };
    });

  const businessTypeOptions =
    businessTypes &&
    businessTypes.data.map((item) => {
      return {
        value: item.name,
        label: item.name,
      };
    });

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
                  value={
                    businessTypeOptions &&
                    businessTypeOptions.map((option) =>
                      option.value === business_type ? option : ""
                    )
                  }
                  onChange={(e) => {
                    setBusinessType(e.value);
                  }}
                  placeholder="Pilih jenis dagang ..."
                />
                <Select
                  className="mb-5"
                  options={stallOptions}
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
                  value={
                    stallOptions &&
                    stallOptions.map((option) =>
                      option.value === stall_id ? option : ""
                    )
                  }
                  onChange={(e) => {
                    setStallId(e.value);
                  }}
                  placeholder="Pilih lapak ..."
                />
              </div>

              <div className="mb-4 pt-6 px-4 relative border rounded-sm bg-slate-50 grid sm:grid-cols-2 gap-x-4 -z-10">
                <FloatingLabel
                  type={"text"}
                  id={"username"}
                  value={username}
                  htmlFor={"username"}
                  text={"Username"}
                  readOnly={true}
                />
                <FloatingLabel
                  type={"text"}
                  id={"password"}
                  value={password}
                  htmlFor={"password"}
                  text={"Password"}
                  readOnly={true}
                />
                <FloatingLabel
                  type={"text"}
                  id={"stall_size"}
                  value={stall_size}
                  htmlFor={"stall_size"}
                  text={"Luas (meter persegi)"}
                  readOnly={true}
                />
                <FloatingLabel
                  type={"text"}
                  id={"stall_cost"}
                  value={stall_cost}
                  htmlFor={"stall_cost"}
                  text={"Biaya Tempat"}
                  readOnly={true}
                />
                <FloatingLabel
                  type={"text"}
                  id={"waste_cost"}
                  value={waste_cost}
                  htmlFor={"waste_cost"}
                  text={"Biaya Sampah"}
                  readOnly={true}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-x-4">
                <Button
                  disabled={isLoading}
                  type={"submit"}
                  variant={"bg-sky-400 hover:bg-sky-500 text-white"}
                  text={!isLoading && "Perbarui"}
                  icon={isLoading && <Spinner />}
                />
              </div>
              <div className="my-2 w-full">
                {isError && (
                  <Alert
                    message={isError.data}
                    variant={
                      "text-orange-500 bg-orange-50 border border-orange-500"
                    }
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
};

export default UpdateRetribution;
