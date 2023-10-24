import React from "react";
import TextField from "@mui/material/TextField";
import { v4 } from "uuid";

const AuthInputDate = ({ label, Value, setValue }) => {
  return (
    <div className="relative mb-[15px] w-[297px] font-[Quicksand]">
      <p className="absolute top-[-11px] left-3 w-fit bg-white text-[15px] font-bold">
        {label}
      </p>
      <input
        type="date"
        id={v4()}
        className="px-3 py-2 pr-2 border border-gray-300 rounded-[7.94px] w-full outline-none font-bold"
        value={Value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default AuthInputDate;
