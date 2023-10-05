import React from "react";
import TextField from "@mui/material/TextField";

const AuthTextArea = ({ label, placeholder, required, Value, setValue }) => {
  return (
    <div className="relative mb-[11px] w-[297px]">
      <p className="absolute top-[-11px] left-4 w-fit bg-white font-[Quicksand] text-[15px]">
        {label}
      </p>
      <textarea
        required={required}
        id="outlined-required"
        placeholder={placeholder}
        className="font-[Quicksand] font-[300] text-[13.9px] px-3 py-2 pr-10 border border-gray-300 rounded-[7.94px] w-full outline-none h-[95px] overflow-hidden"
        value={Value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default AuthTextArea;
