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
      className={`border-2 border-[#465462] px-4 py-[5px] maxWeb1:px-[1.2rem] maxWeb2:px-[1.4rem] maxWeb3:px-[1rem] maxWeb4:px-[1.6rem] rounded-full font-[Quicksand] font-[700] ${
        Value === StationFilter ? "bg-#465462" : Color
      } ${"text-[#465462]"} transition-all duration-500 ease-in-out flex gap-x-6 items-center maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem]  maxWeb4:text-[3rem]`}
      onClick={() => setStationFilter(Value)}
    >
      <span className="px-3">{`${Title}: ${Length}`}</span>
    </button>
  );
};

export default FilterButton;
