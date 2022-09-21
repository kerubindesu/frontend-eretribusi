import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { InputSearch } from "../components/UI/molecules";

const GlobalFilter = ({ globalFilter, setGlobalFilter, setQuery }) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
    setQuery(value);
  }, 300);

  return (
    <InputSearch
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={"Ketik sesuatu ..."}
    />
  );
};

export default GlobalFilter;
