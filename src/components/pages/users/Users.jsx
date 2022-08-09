import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, usersSelector } from "../../../features/users/usersSlice";
import { Input, TabTitle } from "../../UI/atoms";
import { Spinner } from "flowbite-react/lib/esm/components";

const Users = () => {
  TabTitle("Users");
  const dispatch = useDispatch();
  const users = useSelector(usersSelector.selectAll);
  const loading = useSelector((state) => state.users.isLoading);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      console.log("users updated");
    }
  });
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
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Gender
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
              {loading ? (
                <tr className="">
                  <td className="p-8 text-center" colSpan={5}>
                    <Spinner />
                  </td>
                </tr>
              ) : (
                users.map((user, index) => {
                  return (
                    <tr
                      key={user._id}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                        {index + 1}
                      </td>
                      <td className="py-4 px-6">{user.name}</td>
                      <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                        {user.email}
                      </td>
                      <td className="py-4 px-6">
                        {user.gender ? user.gender : "unknown"}
                      </td>
                      <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800 text-right">
                        <Link to={`edit/${user._id}`}>
                          <p className="font-medium text-sky-600 dark:text-sky-500 hover:underline">
                            Edit
                          </p>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Users;
