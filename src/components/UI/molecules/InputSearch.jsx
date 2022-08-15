import React from "react";
import { CgSearch } from "react-icons/cg";

const InputSearch = ({ variant, value }) => {
  return (
    <>
      <form
        className={`px-2 flex items-center justify-between border border-slate-400 rounded ${variant}`}
      >
        <CgSearch className="text-slate-400 text-lg" />
        <input
          type="search"
          placeholder="Cari ..."
          className="w-full py-1 border-0 rounded focus:border-0 focus:outline-none focus:ring-0 text-sm"
          value={value}
        />
      </form>
    </>
  );
};

export default InputSearch;
