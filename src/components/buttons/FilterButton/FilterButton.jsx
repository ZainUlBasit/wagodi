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
      className={`border-2 border-[#465462] px-4 py-[5px] rounded-3xl font-[Quicksand] font-[700] ${
        Value === StationFilter ? "bg-#465462" : Color
      } ${"text-[#465462]"} transition-all duration-500 ease-in-out flex gap-x-6 items-center`}
      onClick={() => setStationFilter(Value)}
    >
      <span className="px-3">{`${Title}: ${Length}`}</span>
    </button>
  );
};

export default FilterButton;
