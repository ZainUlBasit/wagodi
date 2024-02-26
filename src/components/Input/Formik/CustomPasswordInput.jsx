import React, { useState } from "react";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";

const CustomPasswordInput = ({
  name,
  label,
  placeholder,
  required,
  value,
  onChange,
  touched,
  isError,
  errorMsg,
  type,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-[297px] maxInputWidth font-[Quicksand]">
      <p className="absolute top-[-11px] left-3 w-fit bg-white font-[Quicksand] text-[15px] z-10 font-bold InputLabel">
        {label}
      </p>
      <div className="relative font-[Quicksand]">
        <input
          name={name}
          type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
          required={required}
          placeholder={placeholder}
          className="px-3 py-2 pr-10 border border-gray-300 rounded-[7.94px] w-full outline-none InputText"
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 py-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? <RiEyeCloseFill /> : <RiEyeFill />}{" "}
        </button>
      </div>
      {touched && isError && (
        <div className="text-red-500 font-[Quicksand] pl-2 pt-1">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default CustomPasswordInput;
