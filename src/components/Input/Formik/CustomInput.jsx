import React from "react";

const CustomInput = ({
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
  return (
    <div className="relative w-[297px] font-[Quicksand]">
      <label
        htmlFor={name}
        className="absolute top-[-11px] left-3 w-fit bg-white h-[13px] text-[15px] font-bold font-[Quicksand]"
      >
        {label}
      </label>
      <input
        type={type ? type : "text"}
        required={required}
        name={name}
        placeholder={placeholder}
        className="px-3 py-2 border border-gray-300 rounded-[7.94px] w-full outline-none font-[Quicksand]"
        value={value}
        onChange={onChange}
      />
      {touched && isError && (
        <div className="text-red-500 font-[Quicksand] pl-2 pt-1">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
