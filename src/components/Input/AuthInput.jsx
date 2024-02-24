import React from "react";
import TextField from "@mui/material/TextField";
import { v4 } from "uuid";
import "./AuthInput.css";

const AuthInput = ({
  Type,
  label,
  placeholder,
  required,
  Value,
  setValue,
  readonly,
  disabled,
}) => {
  return (
    <div className="relative mb-[15px] w-[297px] maxInputWidth font-[Quicksand]">
      <p className="absolute top-[-11px] left-3 w-fit bg-white h-[13px] text-[15px] font-bold InputLabel">
        {label}
      </p>
      <input
        type={Type ? Type : "text"}
        required={required}
        id={v4()}
        placeholder={placeholder}
        className="px-3 py-2 border border-gray-300 rounded-[7.94px] w-full outline-none InputText"
        value={Value}
        readOnly={readonly ? true : false}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled ? disabled : false}
      />
    </div>
  );
};

export default AuthInput;
