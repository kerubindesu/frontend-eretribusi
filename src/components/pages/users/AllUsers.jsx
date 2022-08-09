import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  deleteUser,
  usersSelector,
} from "../../../features/users/usersSlice";
import { TabTitle } from "../../UI/atoms";
import { Spinner } from "flowbite-react/lib/esm/components";
import { InputSearch } from "../../UI/molecules";
import { MdOutlineDataSaverOn } from "react-icons/md";

const AllUsers = () => {
  TabTitle("Users");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(usersSelector.selectAll);
  const loading = useSelector((state) => state.users.isLoading);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {});
  return (
    <>
      <div className="bg-white">
        <div className="pb-4 w-full flex gap-4 items-center justify-between text-xl">
          <InputSearch />
          <Link to="add">
            <div className="p-2 bg-sky-400 hover:bg-sky-500 rounded text-sm text-white cursor-pointer whitespace-nowrap flex items-center gap-2">
              <MdOutlineDataSaverOn className="text-lg" />
              <span>Add User</span>
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
                      <td className="py-4 px-6 flex gap-4 bg-gray-50 dark:bg-gray-800 text-right">
                        <Link to={`${user._id}`}>
                          <p className="font-medium text-sky-600 dark:text-sky-500 hover:underline">
                            Edit
                          </p>
                        </Link>
                        <div
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(deleteUser(user._id));
                            navigate("/users");
                          }}
                        >
                          <span
                            type="click"
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Delete
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
    </>
  );
};

export default AllUsers;
