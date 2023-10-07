import React from "react";
import CustomModal from "./CustomModal";

const StationReport = ({ StationName, open, setOpen }) => {
  return (
    <CustomModal title={StationName} open={open} setOpen={setOpen}>
      <div className="flex flex-col justify-center">
        {/* header */}
        <div className="w-full text-center bg-[#465462] text-white font-[600] font-[Quicksand] text-[1.6rem] py-2 border-b-[1px] border-b-white">
          {StationName}
        </div>
        {/* titles */}
        <div className="flex w-[750px] py-3 bg-[#465462] text-white rounded-br-[20px] rounded-bl-[20px]">
          {/* Date */}
          <div className="font-[Quicksand] text-center font-[600] text-[1.5rem] w-[150px]">
            DATE
          </div>
          {/* Sold Volume */}
          <div className="font-[Quicksand] text-center font-[600] text-[1.5rem] w-[300px]">
            SOLD VOLUME
          </div>
          {/* Recieved Volume */}
          <div className="font-[Quicksand] text-center font-[600] text-[1.5rem] w-[300px]">
            RECEIVED VOLUME
          </div>
        </div>

        {/* body */}
        <div className="flex w-[750px] text-[#465462] h-[20vh] items-center border-b-[1px] border-b-[#46546266]">
          {/* Date */}
          <div className="font-[Quicksand] text-center font-[600] text-[1.1rem] w-[150px] flex flex-col justify-center border-r-[1px]  border-r-[#46546266] h-full">
            12 <span className="font-[300] text-[.9rem]">Sep, 23</span>
          </div>
          {/* Sold Volume */}
          <div className="font-[Quicksand] text-center font-[600] text-[1.5rem] w-[300px] border-r-[1px]  border-r-[#46546266] h-full flex justify-center items-center">
            2000
          </div>
          {/* Recieved Volume */}
          <div className="font-[Quicksand] text-center font-[600] text-[1.5rem] w-[300px] border-r-[1px]  border-r-[#46546266] h-full flex justify-center items-center">
            -
          </div>
        </div>
        <div className="flex w-[750px] text-[#465462] h-[20vh] items-center border-b-[1px] border-b-[#46546266]">
          {/* Date */}
          <div className="font-[Quicksand] text-center font-[600] text-[1.1rem] w-[150px] flex flex-col justify-center border-r-[1px]  border-r-[#46546266] h-full">
            13 <span className="font-[300] text-[.9rem]">Sep, 23</span>
          </div>
          {/* Sold Volume */}
          <div className="font-[Quicksand] text-center font-[600] text-[1.5rem] w-[300px] border-r-[1px]  border-r-[#46546266] h-full flex justify-center items-center">
            -
          </div>
          {/* Recieved Volume */}
          <div className="font-[Quicksand] text-center font-[600] text-[1.5rem] w-[300px] border-r-[1px]  border-r-[#46546266] h-full flex justify-center items-center">
            1000
          </div>
        </div>
        <div className="flex w-[750px] text-[#465462] h-[20vh] items-center border-b-[1px] border-b-[#46546266]">
          {/* Date */}
          <div className="font-[Quicksand] text-center font-[600] text-[1.1rem] w-[150px] flex flex-col justify-center border-r-[1px]  border-r-[#46546266] h-full">
            14 <span className="font-[300] text-[.9rem]">Sep, 23</span>
          </div>
          {/* Sold Volume */}
          <div className="font-[Quicksand] text-center font-[600] text-[1.5rem] w-[300px] border-r-[1px]  border-r-[#46546266] h-full flex justify-center items-center">
            5000
          </div>
          {/* Recieved Volume */}
          <div className="font-[Quicksand] text-center font-[600] text-[1.5rem] w-[300px] border-r-[1px]  border-r-[#46546266] h-full flex justify-center items-center">
            10,000
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default StationReport;
