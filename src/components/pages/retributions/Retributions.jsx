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
import { Button, TabTitle } from "../../UI/atoms";

const Retributions = () => {
  TabTitle("Retribusi");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAuth } = useSelector((state) => state.auth);
  const retributions = useSelector(retributionsSelector.selectAll);
  const isLoading = useSelector((state) => state.retributions.isLoading);
  const [id, setId] = useState(null);

  const confirm = async (e) => {
    e.preventDefault();
    dispatch(deleteRetribution(id));
    navigate("/retributions");
    dispatch(setModal(false));
  };

  useEffect(() => {
    if (userAuth) {
      dispatch(getRetributions());
    }
  }, [userAuth, dispatch]);
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="w-full flex items-center justify-between gap-4">
          <div>
            <div className="w-full sm:max-w-sm">
              <InputSearch />
            </div>
          </div>
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

        <div className="overflow-x-auto relative">
          <table className="w-full text-left text-gray-500 dark:text-gray-400 whitespace-nowrap">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  #
                </th>
                <th scope="col" className="py-3 px-6">
                  Nama
                </th>
                <th scope="col" className="py-3 px-6">
                  Alamat
                </th>
                <th scope="col" className="py-3 px-6">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="p-8 text-center" colSpan={4}>
                    <Spinner />
                  </td>
                </tr>
              ) : retributions.length === 0 ? (
                <tr>
                  <td className="p-8 text-center" colSpan={4}>
                    <span>Data tidak ditemukan</span>
                  </td>
                </tr>
              ) : (
                retributions.map((retribution, index) => {
                  return (
                    <tr
                      key={retribution._id}
                      className="border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="py-4 px-6">{retribution.name}</td>
                      <td className="py-4 px-6">{retribution.address}</td>
                      <td className="py-4 px-6 flex gap-2">
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

export default Retributions;
