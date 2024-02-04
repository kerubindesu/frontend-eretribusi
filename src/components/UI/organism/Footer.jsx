import React from "react";

const Footer = ({ variant }) => {
  return (
    <>
      <div
        className={`w-full flex items-center text-xs text-slate-600 whitespace-nowrap font-normal cursor-default ${variant}`}
      >
        <span>&#x24B8; 2022 Kelfin Nurohman</span>
      </div>
    </>
  );
};

export default Footer;
