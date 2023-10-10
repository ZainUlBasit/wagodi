import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import { FaChevronDown } from "react-icons/fa";

const DateInput = ({ label, required, Value, setValue }) => {
  const inputRef = useRef(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <div className="relative w-[200px] flex items-center">
      <p className="absolute top-[-11px] left-4 w-fit bg-white font-[Quicksand] text-[15px]">
        {label}
      </p>
      <input
        type="date"
        required={required}
        id="outlined-required"
        className="px-3 py-2 border border-gray-300 rounded-[7.94px] w-full outline-none font-[Quicksand] font-bold shadow-[rgba(149,157,165,0.2)_0px_8px_24px]"
        value={Value}
        onChange={(e) => setValue(e.target.value)}
      />
      <label className="ml-2 cursor-pointer" onClick={handleIconClick}>
        <FaChevronDown className="font-bold text-[1.3rem]" />
      </label>
    </div>
  );
};

export default DateInput;
