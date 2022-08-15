import React from "react";

const Input = ({ type, value, variant, name, placeholder, onChange }) => {
  return (
    <input
      onChange={onChange}
      className={`w-full text-slate-600 border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-300 focus:bg-slate-50 focus:ring-0 max-h-10 ${variant}`}
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete="off"
      value={value}
    />
  );
};

export default Input;
