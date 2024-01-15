import React from "react";
import TextField from "@mui/material/TextField";
import { BsChevronDown } from "react-icons/bs";
import { v4 } from "uuid";

const AuthInputPopOver = ({ label, placeholder, required, Value, onClick }) => {
  return (
    <div
      className="relative mb-[15px] w-[297px] font-[Quicksand]"
      onClick={onClick}
    >
      <p className="absolute top-[-11px] left-3 w-fit bg-white font-[Quicksand] text-[15px] font-bold">
        {label}
      </p>
      <div className="px-3 py-2 pr-10 border border-gray-300 rounded-[7.94px] w-full outline-none cursor-pointer">
        {Value === "" ? placeholder : Value}
      </div>
      <BsChevronDown className="flex absolute right-3 top-[.85rem]" />
    </div>
  );
};

export default AuthInputPopOver;
