import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Alert = ({ message, variant }) => {
  return (
    <>
      <div
        className={`p-4 mb-4 rounded flex items-center gap-2 text-sm ${variant}`}
        role="alert"
      >
        <HiOutlineExclamationCircle className="text-2xl" />
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">{message}</span>
        </div>
      </div>
    </>
  );
};

export default Alert;
