import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../../features/modal/modalSlice";

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
        <div className="relative p-4 w-full max-w-xs h-full md:h-auto">
          <div
            onClick={() => dispatch(setModal(false))}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          ></div>
          <div className="mx-auto relative bg-white rounded-sm shadow dark:bg-gray-700">
            <div className="p-6 text-start flex flex-col justify-between gap-4">
              <span className="text-xl font-semibold">Konfirmasi</span>
              <span className="font-normal text-gray-500 dark:text-gray-400">
                <p>Data yang telah dihapus tidak dapat dilihat lagi.</p>
                <p>{message}</p>
              </span>
              <div className="flex justify-between">
                <button
                  onClick={() => dispatch(setModal(false))}
                  data-modal-toggle="popup-modal"
                  type="button"
                  className="px-4 py-2 text-gray-500 hover:bg-gray-100 font-medium rounded-xs hover:text-gray-900 focus:z-10 "
                >
                  Tidak
                </button>
                <button
                  onClick={confirm}
                  data-modal-toggle="popup-modal"
                  type="button"
                  className="px-4 py-2 text-sky-500 hover:bg-gray-100 font-medium rounded-xs inline-flex items-center text-center"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;
