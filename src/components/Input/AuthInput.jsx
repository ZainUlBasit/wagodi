import React from "react";
import TextField from "@mui/material/TextField";
import { v4 } from "uuid";

const AuthInput = ({ label, placeholder, required, Value, setValue }) => {
  return (
    <div className="relative mb-[15px] w-[297px] font-[Quicksand]">
      <p className="absolute top-[-11px] left-3 w-fit bg-white text-[15px] font-bold">
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

export default AuthInput;
