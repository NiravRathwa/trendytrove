import React from "react";
import "./Loader.css";
import { LoaderIcon } from "./Icons";
const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-white">
      <LoaderIcon />
    </div>
  );
};

export default Loader;
