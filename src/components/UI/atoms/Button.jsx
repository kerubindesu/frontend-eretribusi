import React from "react";

const Button = ({ type, variant, icon, text }) => {
  return (
    <>
      <button
        type={type}
        className={`w-full rounded-lg p-2 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-300 focus:ring-0 flex items-center gap-1 justify-center ${variant}`}
      >
        <span className="text-lg">{icon}</span>
        {text}
      </button>
    </>
  );
};

export default Button;
