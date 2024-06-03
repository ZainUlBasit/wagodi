import React from "react";
import TextField from "@mui/material/TextField";
import { v4 } from "uuid";
import ErrorToast from "../Toast/ErrorToast";

const GasInput = ({
  label,
  type,
  placeholder,
  required,
  Value,
  setValue,
  last,
}) => {
  return (
    <div
      className={`relative mb-[15px] ${
        last ? "w-[150px]" : "w-[120px]"
      } font-[Quicksand]`}
    >
      <p className="absolute top-[-11px] left-3 w-fit bg-white font-[Quicksand] text-[15px] font-bold">
        {label}
      </p>
      <input
        type={type}
        required={required}
        id={v4()}
        placeholder={placeholder}
        className="px-3 py-2 pr-1 border border-gray-300 rounded-[7.94px] w-full outline-none"
        value={Value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (e.target.value < 0) {
            ErrorToast("Value must greater than 0");
            setValue("");
          }
        }}
      />
    </div>
  );
};

export default GasInput;
