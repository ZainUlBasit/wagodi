import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NotificationTable from "../../components/Tables/NotificationTable";
import { BiSolidChevronRight } from "react-icons/bi";

const Notification = () => {
  const [FromDate, setFromDate] = useState("2023-12-11");
  const [ToDate, setToDate] = useState("2023-12-18");
  useEffect(() => {
    console.log(FromDate);
    console.log(ToDate);
  }, [FromDate, ToDate]);
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center w-full">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex justify-between items-center mt-6 mb-5">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem]">
            General Notifications
          </div>
          {/* Right */}
          <div className="font-[Quicksand] font-[700] flex gap-x-2 items-center">
            <div className="relative w-[200px]">
              <p className="absolute top-[-11px] left-4 px-[4px] w-fit bg-white font-[Quicksand] text-[15px]">
                From
              </p>
              <input
                type="date"
                name="fromdate"
                id="fromdate"
                value={FromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-3 py-2 pr-2 border border-[#E8E8E8] rounded-[7.94px] w-full outline-none"
              />
            </div>
            <div className="text-[1.5rem] flex justify-center items-center">
              <BiSolidChevronRight />
            </div>
            <div className="relative w-[200px]">
              <p className="absolute top-[-11px] left-4 px-[4px] w-fit bg-white font-[Quicksand] text-[15px]">
                To
              </p>
              <input
                type="date"
                name="todate"
                id="todate"
                value={ToDate}
                className="px-3 py-2 pr-2 border border-[#E8E8E8] rounded-[7.94px] w-full outline-none"
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-[90%] max-w-[1200px] flex flex-start overflow-hidden ">
          <NotificationTable />
        </div>
      </div>
    </>
  );
};

export default Notification;
