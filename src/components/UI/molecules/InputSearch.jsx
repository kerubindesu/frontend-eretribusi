import React from "react";
import { CgSearch } from "react-icons/cg";

const InputSearch = () => {
  return (
    <>
      <form className="px-2 flex items-center justify-between border border-slate-400 rounded-full">
        <CgSearch className="text-slate-400" />
        <input
          type="search"
          placeholder="Search"
          className="max-w-[8rem] lg:w-[19.5rem] border-0 rounded-xl focus:border-0 focus:outline-none focus:ring-0"
        />
      </form>
    </>
  );
};

export default InputSearch;
