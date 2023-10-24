import React from "react";
import TextField from "@mui/material/TextField";
import { v4 } from "uuid";

const GasInput = ({ label, placeholder, required, Value, setValue }) => {
  return (
    <div className="relative mb-[15px] w-[155px] font-[Quicksand]">
      <p className="absolute top-[-11px] left-4 w-fit bg-white font-[Quicksand] text-[15px]">
        {label}
      </p>
      <input
        type="text"
        required={required}
        id={v4()}
        placeholder={placeholder}
        className="px-3 py-2 pr-10 border border-gray-300 rounded-[7.94px] w-full outline-none"
        value={Value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default GasInput;
