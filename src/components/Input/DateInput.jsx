import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import { FaChevronDown } from "react-icons/fa";
import { v4 } from "uuid";

const DateInput = ({ label, required, Value, setValue }) => {
  const inputRef = useRef(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <div className="relative w-[200px] flex items-center shadow-[rgba(149,157,165,0.2)_0px_8px_24px]">
      <p className="absolute top-[-11px] left-3 w-fit bg-white font-[Quicksand] text-[15px] font-bold">
        {label}
      </p>
      <input
        type="date"
        required={required}
        id={v4()}
        className="px-3 py-2 border bg-white border-gray-300 rounded-[7.94px] w-full outline-none font-[Quicksand] font-bold"
        value={Value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default DateInput;
