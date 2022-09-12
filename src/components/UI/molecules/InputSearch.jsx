import React from "react";
import { CgSearch } from "react-icons/cg";

const InputSearch = ({ variant, value, onChange, placeholder }) => {
  return (
    <>
      <form
        className={`px-2 w-full sm:max-w-sm flex items-center justify-between border border-slate-200 rounded-full ${variant}`}
      >
        <CgSearch className="text-slate-400 text-lg" />
        <input
          type="search"
          placeholder={placeholder}
          className="w-full py-2 bg-bottom border-0 rounded-full focus:border-0 focus:outline-none focus:ring-0 text-sm"
          value={value}
          onChange={onChange}
          autoFocus={true}
        />
      </form>
    </>
  );
};

export default InputSearch;
