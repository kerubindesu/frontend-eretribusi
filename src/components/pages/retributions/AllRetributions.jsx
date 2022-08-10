import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getRetributions,
  deleteRetribution,
  retributionsSelector,
} from "../../../features/retributions/retributionsSlice";
import { setModal } from "../../../features/modal/modalSlice";
import { Spinner } from "flowbite-react/lib/esm/components";
import { InputSearch } from "../../UI/molecules";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { Dialog } from "../../UI/organism";

const AllRetributions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const retributions = useSelector(retributionsSelector.selectAll);
  const loading = useSelector((state) => state.retributions.isLoading);
  const [id, setId] = useState(null);

  // const [showDialog, setShowDialog] = useState(false);

  const confirm = async (e) => {
    e.preventDefault();
    dispatch(deleteRetribution(id));
    navigate("/retributions");
    dispatch(setModal(false));
  };

  // const handleDelete = () => {
  //   setShowDialog(true);
  // };

  useEffect(() => {
    dispatch(getRetributions());
  }, [dispatch]);
  return (
    <>
      <div className="bg-white">
        <div className="pb-4 w-full flex gap-4 items-center justify-between text-xl">
          <InputSearch />
          <Link to="add">
            <div className="p-2 bg-sky-400 hover:bg-sky-500 rounded text-sm text-white cursor-pointer whitespace-nowrap flex items-center gap-2">
              <MdOutlineDataSaverOn className="text-lg" />
              <span>Add retribution</span>
            </div>
          </Link>
        </div>
        <div className="overflow-x-auto relative sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="py-3 px-6 bg-gray-50 dark:bg-gray-800"
                >
                  #
                </th>
                <th scope="col" className="py-3 px-6">
                  Nama
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 bg-gray-50 dark:bg-gray-800"
                >
                  Alamat
                </th>
                <th scope="col" className="py-3 px-6">
                  <span className="sr-only">Ubah</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="p-8 text-center" colSpan={5}>
                    <Spinner />
                  </td>
                </tr>
              ) : retributions.length === 0 ? (
                <tr>
                  <td className="p-8 text-center" colSpan={5}>
                    <span>Data tidak ditemukan</span>
                  </td>
                </tr>
              ) : (
                retributions.map((retribution, index) => {
                  return (
                    <tr
                      key={retribution._id}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                        {index + 1}
                      </td>
                      <td className="py-4 px-6">{retribution.name}</td>
                      <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                        {retribution.address}
                      </td>
                      <td className="py-4 px-6 flex gap-4">
                        <Link to={`${retribution._id}`}>
                          <p className="font-medium text-sky-600 dark:text-sky-500 hover:underline">
                            Edit
                          </p>
                        </Link>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            setId(retribution._id);
                            dispatch(setModal(true));
                          }}
                        >
                          <span
                            type="click"
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Hapus
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog
        message={"Anda yakin akan menghapus data ini?"}
        confirm={confirm}
      />
    </>
  );
};

export default AllRetributions;
