import React from "react";

const Field = ({ text, variant }) => {
  return (
    <span
      className={`box-border text-ellipsis overflow-hidden whitespace-nowrap ${variant}`}
    >
      {text}
    </span>
  );
};

export default Field;
