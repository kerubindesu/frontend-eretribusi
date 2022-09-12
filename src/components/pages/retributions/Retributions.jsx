import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { useSelector, useDispatch } from "react-redux";
import {
  getRetributions,
  deleteRetribution,
} from "../../../features/retributions/retributionsActions";
import { setModal } from "../../../features/modal/modalSlice";
import { Spinner } from "flowbite-react/lib/esm/components";
import { InputSearch } from "../../UI/molecules";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { Dialog, Table } from "../../UI/organism";
import { Button, Heading, TabTitle } from "../../UI/atoms";

const Retributions = () => {
  TabTitle("Retribusi");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState(null);
  const [message, setMessage] = useState("");

  const { loading, error, success, retributions } = useSelector(
    (state) => state.retributions
  );

  useEffect(() => {
    dispatch(getRetributions());
    console.log(retributions);
  }, [dispatch]);

  const retributionsData = retributions.map((retribution, index) => {
    return {
      "#": index + 1,
      Tipe: retribution.stall.type,
      Nomor: retribution.stall.name,
      Luas: retribution.stall.size,
      Nama: retribution.person.name,
      "Jenis Dagang": retribution.person.commerce_type,
      Alamat: retribution.person.address,
      id: retribution._id,
    };
  });

  // Delete Retribution
  const confirm = async (e) => {
    e.preventDefault();
    dispatch(deleteRetribution(id));
    navigate("/retributions");
    dispatch(setModal(false));
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="w-full flex items-center justify-between gap-4">
          <Heading text={"Retribusi"} variant={"text-xl"} />
          <Link to="add">
            <Button
              variant={
                "w-max py-1 bg-sky-400 hover:bg-sky-500 rounded text-white"
              }
              text={"Retribusi"}
              icon={<MdOutlineDataSaverOn />}
            />
          </Link>
        </div>

        {loading ? (
          <div className="w-full min-h-max flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <Table tableData={retributionsData} />
        )}
      </div>
      <Dialog
        message={`Akun yang terhubung akan terhapus. Ingin menghapus ${message}?`}
        confirm={confirm}
      />
    </>
  );
};

export default Retributions;
