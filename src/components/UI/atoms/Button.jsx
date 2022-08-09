import React from "react";

const Button = ({ type, variant, name }) => {
  return (
    <>
      <button
        type={type}
        className={`w-full rounded-lg p-2 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-300 focus:ring-0 ${variant}`}
      >
        {name}
      </button>
    </>
  );
};

export default Button;
