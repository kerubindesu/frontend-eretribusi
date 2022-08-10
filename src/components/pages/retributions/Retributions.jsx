import React from "react";
import { Outlet } from "react-router-dom";

const Retributions = () => {
  return (
    <>
      <div className="flex-1">
        <Outlet />
      </div>
    </>
  );
};

export default Retributions;
