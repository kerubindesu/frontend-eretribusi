import React from "react";

const Button = ({ type, variant, icon, text, disabled }) => {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        className={`w-full rounded p-2 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-300 focus:ring-0 flex items-center gap-1 justify-center whitespace-nowrap shadow text-sm ${variant}`}
      >
        <span className="text-lg">{icon}</span>
        <span>{text}</span>
      </button>
    </>
  );
};

export default Button;
