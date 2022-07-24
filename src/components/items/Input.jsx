import React from "react";

const Input = ({ type, variant, name, placeholder }) => {
  return (
    <input
      className={`w-full bg-white text-slate-600 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-300 focus:bg-slate-50 focus:ring-0 max-h-10 text-xs ${variant}`}
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete="off"
    />
  );
};

export default Input;
