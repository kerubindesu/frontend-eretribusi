import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../../features/modal/modalSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { CgClose } from "react-icons/cg";

const Dialog = ({ message, confirm }) => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.showModal);

  return (
    <>
      <div
        id="popup-modal"
        tabIndex="-1"
        className={`${
          showModal ? "flex" : "hidden"
        } justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full`}
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div
            onClick={() => dispatch(setModal(false))}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          ></div>
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={() => dispatch(setModal(false))}
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
            >
              <CgClose className="text-lg" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <HiOutlineExclamationCircle className="mx-auto text-8xl text-gray-700" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {message}
              </h3>
              <button
                onClick={confirm}
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Hapus
              </button>
              <button
                onClick={() => dispatch(setModal(false))}
                data-modal-toggle="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;
