import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getRetributions,
  retributionSelector,
} from "../../../features/retribution/retributionSlice";
import { Input, TabTitle } from "../../UI/atoms";

const Retributions = () => {
  TabTitle("Retribusi");

  const dispatch = useDispatch();
  const retributions = useSelector(retributionSelector.selectAll);

  useEffect(() => {
    dispatch(getRetributions());
  }, [dispatch]);

  // const [retributions, setRetribution] = useState();
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/v1/kompos/retributions?page=1&perPage=15")
  //     .then((result) => {
  //       console.log("Data API :", result.data);
  //       const responseAPI = result.data;

  //       setRetribution(responseAPI.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error :", err);
  //     });
  // }, []);
  return (
    <>
      <div className="bg-white">
        <div className="pb-4 w-full flex gap-4 items-center justify-between text-xl">
          <form>
            <Input
              type="search"
              name="search"
              placeholder={"Search"}
              variant="max-w-[12rem] lg:w-[19.5rem] bg-white focus:bg-gray-50 rounded-lg"
            />
          </form>
          <Link to="create">
            <div className="p-2 bg-sky-400 hover:bg-sky-500 rounded text-sm text-white cursor-pointer">
              Tambah user
            </div>
          </Link>
        </div>
        <div className="overflow-x-auto relative sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  #
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 bg-gray-50 dark:bg-gray-800"
                >
                  Tipe
                </th>
                <th scope="col" className="py-3 px-6">
                  Nomor
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 bg-gray-50 dark:bg-gray-800"
                >
                  Luas
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
                  Jenis Daganga
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 bg-gray-50 dark:bg-gray-800"
                >
                  <span className="sr-only">Ubah</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {retributions.map((retribution, index) => {
                return (
                  <tr
                    key={retribution._id}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="py-4 px-6">{index + 1}</td>
                    {/* <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                    >
                      {retribution.tempat.tipe}
                    </th>
                    <td className="py-4 px-6">{retribution.tempat.nomor}</td>
                    <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                      {retribution.tempat.luas} m<sup>2</sup>
                    </td> */}
                    <td className="py-4 px-6">{retribution.nama}</td>
                    <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                      {retribution.alamat}
                    </td>
                    {/* <td className="py-4 px-6">
                      {retribution.tempat.jenis_dagang}
                    </td> */}
                    <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800 text-right">
                      <Link to="edit">
                        <p className="font-medium text-sky-600 dark:text-sky-500 hover:underline">
                          Edit
                        </p>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Retributions;
