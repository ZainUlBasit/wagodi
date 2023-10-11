import React from "react";
import TextField from "@mui/material/TextField";
import { BsChevronDown } from "react-icons/bs";

const AuthInputPopOver = ({ label, placeholder, required, Value, onClick }) => {
  return (
    <div className="relative mb-[15px] w-[297px]" onClick={onClick}>
      <p className="absolute top-[-11px] left-4 w-fit bg-white font-[Quicksand] text-[15px]">
        {label}
      </p>
      <input
        type="text"
        required={required}
        disabled
        id="outlined-required"
        placeholder={placeholder}
        className="px-3 py-2 pr-10 border border-gray-300 rounded-[7.94px] w-full outline-none"
        value={Value}
        // onChange={(e) => setValue(e.target.value)}
      />
      <BsChevronDown className="flex absolute right-3 top-[.85rem]" />
    </div>
  );
};

export default AuthInputPopOver;
