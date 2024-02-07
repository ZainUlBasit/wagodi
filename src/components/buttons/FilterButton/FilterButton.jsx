import React from "react";

const FilterButton = ({
  setStationFilter,
  StationFilter,
  Length,
  Title,
  Value,
  Color,
}) => {
  return (
    <button
      className={`relative text-center tracking-[1px] no-underline cursor-pointer border-solid ${
        Value !== StationFilter
          ? " shadow-[inset_0_0_0_0_#fff] hover:shadow-[inset_0_-100px_0_0_#fff] active:scale-90 hover:bg-[#465462]"
          : ""
      } transition-all duration-500 ease-in-out flex gap-x-6 items-center  text-[1rem] maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem]  maxWeb4:text-[3rem] border-2 border-[#465462] px-4 py-[5px] maxWeb1:px-[1.2rem] maxWeb2:px-[1.4rem] maxWeb3:px-[1rem] maxWeb4:px-[1.6rem] rounded-full font-[Quicksand] font-[700] ${
        Value === StationFilter ? "bg-#465462" : Color
      } ${
        Value == StationFilter ? " text-[#465462] " : " text-white"
      } hover:text-[#465462] transition-all duration-500 ease-in-out flex gap-x-6 items-center maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem]  maxWeb4:text-[3rem]`}
      onClick={() => setStationFilter(Value)}
    >
      <span className="px-3">{`${Title}: ${Length}`}</span>
    </button>
  );
};

export default FilterButton;
