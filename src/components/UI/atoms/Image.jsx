import React from "react";

const Image = ({ src, variant, alt }) => {
  return (
    <>
      <img src={src} alt={alt} className={variant} />
    </>
  );
};

export default Image;
