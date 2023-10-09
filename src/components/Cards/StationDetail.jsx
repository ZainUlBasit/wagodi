import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import StationReport from "../Modals/StationReport";

const StationDetail = ({
  StationName,
  LastOrder,
  Octane,
  HiOctane,
  Diesel,
  OctaneCapacity,
  HiOctaneCapacity,
  DieselCapacity,
  status,
  favourites,
  setOpen,
  Open,
  setCurrentStationName,
}) => {
  return (
    <>
      <div
        className={`${
          status === "Healthy"
            ? "bg-[#2EB100]"
            : status === "BeReady"
            ? "bg-[#6877DC]"
            : status === "MakeOrder"
            ? "bg-[#C93D33]"
            : ""
        } text-white rounded-[16px] h-[165px] cursor-pointer`}
        onClick={() => {
          setOpen(!Open);
          setCurrentStationName(StationName);
        }}
      >
        {/* Header (Station Name*/}
        <div className="flex justify-between items-center w-full px-5 pr-5 pt-4">
          <div className="font-[Quicksand] font-[700] text-[1.1rem]">
            Station Name:{" "}
            <span className="font-[Quicksand] font-[400]">{StationName}</span>
          </div>
          <div>{favourites ? <AiFillStar /> : <AiOutlineStar />}</div>
        </div>
        {/* Middle (Last Order Detail) */}
        <div className="flex font-[Quicksand] font-[700] text-[1.1rem] gap-x-1 px-5 pt-1">
          Last Ordered:
          <span className="font-[Quicksand] font-[400]">{LastOrder}</span>
        </div>
        {/* Footer (Detail) */}
        <div className="flex flex-col justify-center items-center py-5 pt-2 w-[100%]">
          {HiOctane && (
            <div className="flex pl-4 items-center w-[100%] gap-x-4">
              <div className="font-[700] font-[Quicksand] text-[.9rem] ">
                95
              </div>
              <div className="font-[500] font-[Quicksand] text-[.8rem]">
                40,0000/ <span>{HiOctaneCapacity}</span>
              </div>
            </div>
          )}
          {Octane && (
            <div className="flex pl-4 items-center w-[100%] gap-x-4">
              <div className="font-[700] font-[Quicksand] text-[.9rem] ">
                91
              </div>
              <div className="font-[500] font-[Quicksand] text-[.8rem]">
                40,0000/<span>{OctaneCapacity}</span>
              </div>
            </div>
          )}
          {Diesel && (
            <div className="flex pl-4 items-center w-[100%] gap-x-4">
              <div className="font-[700] font-[Quicksand] text-[.9rem] ">D</div>
              <div className="font-[500] font-[Quicksand] text-[.8rem]">
                40,0000/<span>{DieselCapacity}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StationDetail;
