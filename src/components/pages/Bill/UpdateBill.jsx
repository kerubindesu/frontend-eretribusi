import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { Button, Heading, Input, TabTitle } from "../../UI/atoms";
import Select from "react-select";
import { Spinner } from "flowbite-react";
import { Alert } from "../../UI/organism";
import { RandomString } from "../../../config/RandomString";
import { getBill, updateBill } from "../../../features/bills/billActions";

const UpdateBill = () => {
  TabTitle("Edit Tagihan");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [stall_type, setStallType] = useState("");
  const [new_date, setNewDate] = useState("");

  const { isLoading, isError, bill } = useSelector((state) => state.bills); // payload

  useEffect(() => {
    dispatch(getBill(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (bill) {
      setStallType(bill.stall_type);
      setNewDate(new Date(bill.due_date).toISOString().substring(0, 10));
    }
  }, [bill]);

  const updateData = {
    id,
    stall_type,
    new_date,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      updateBill({
        id: id,
        updateData,
        navigate,
      })
    );
  };

  const options = [
    { value: "kios", label: "KIOS" },
    { value: "los", label: "LOS" },
  ];

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
            <div className="col-span-3 sm:col-span-2">
              <div className="grid sm:grid-cols-2 gap-x-4">
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
                <Input
                  type={"date"}
                  value={new_date}
                  variant={"w-full rounded text-xs"}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </div>
              <div className="mt-4 sm:mt0 grid sm:grid-cols-2 gap-x-4">
                <Button
                  disabled={isLoading}
                  type={"submit"}
                  variant={"bg-sky-400 hover:bg-sky-500 text-white"}
                  text={!isLoading && "Update"}
                  icon={isLoading && <Spinner />}
                />
              </div>
              <div className="my-4 w-full">
                {!isError ? (
                  <Alert
                    message={
                      "Tenggat waktu tagihan KIOS akan diatur menjadi akhir bulan pada tanggal yang di pilih. contoh, 16/01/2022 menjadi 31/01/2022."
                    }
                    variant={"text-sky-700 bg-sky-50 border border-sky-500"}
                  />
                ) : (
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
  }
};

export default UpdateBill;
