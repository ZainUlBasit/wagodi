import React from "react";
import "./SideBtn.css";

const SideBtn = ({
  ActiveButton,
  setActiveButton,
  FilterText,
  title,
  Icon,
  onClick,
}) => {
  return (
    <div
      className={`flex transition-all duration-500 ease-in-out gap-x-4 items-center px-5 py-3 SideButtonWrapper cursor-pointer rounded-full  ${
        ActiveButton === FilterText
          ? "bg-[#56636F] text-white "
          : " text-[#56636F] bg-white"
      }`}
      onClick={onClick ? onClick : () => setActiveButton(FilterText)}
    >
      <Icon className="text-[1.5rem] SideButtonIcon font-[700] font-[Quicksand]" />
      <span className="text-[1.3rem] SideButtonText font-[700] font-[Quicksand]">
        {title}
      </span>
    </div>
  );
};

export default SideBtn;
