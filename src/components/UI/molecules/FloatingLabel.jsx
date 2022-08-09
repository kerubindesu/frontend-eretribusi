import React from "react";

const FloatingLabel = ({ type, value, id, htmlFor, text, onChange }) => {
  return (
    <>
      <div className="relative z-0 mb-6 w-full group">
        <input
          type={type}
          value={value}
          id={id}
          onChange={onChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-400 focus:outline-none focus:ring-0 focus:border-sky-500 peer"
          placeholder={" "}
          autoComplete="off"
        />
        <label
          htmlFor={htmlFor}
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-500 peer-focus:dark:text-sky-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {text}
        </label>
      </div>
    </>
  );
};

export default FloatingLabel;
