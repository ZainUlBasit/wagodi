import React, { useState } from "react";
import { BiSolidChevronRight } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import ControlSubscribersTable from "../../components/Tables/ControlSubscribersTable";

const ControlSubscribers = () => {
  const [SearchText, setSearchText] = useState("");
  const [ToDate, setToDate] = useState("2023-12-11");
  const [FromDate, setFromDate] = useState("2023-12-11");
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex justify-between items-center mt-6">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem]">
            Control Subscribers
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4">
            <div className="font-[Quicksand] font-[700] flex gap-x-2 items-center max767:hidden">
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
            <div className="flex border-[1px] w-[300px] border-black items-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden max767:hidden">
              <BsSearch />
              <input
                className="outline-none w-full"
                placeholder="Search Request Number"
                value={SearchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div
          className="w-[90%] max-w-[1200px] border-[1px] border-[#465462] rounded-[30px] overflow-hidden shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px]
        my-5"
        >
          <ControlSubscribersTable
            Data={[
              {
                name: "Company  ABC",
                no_of_stations: "800",
                sub_type: "Diamond",
                duration: "31 Days",
              },
              {
                name: "Company  ABC",
                no_of_stations: "800",
                sub_type: "Diamond",
                duration: "31 Days",
              },
              {
                name: "Company  ABC",
                no_of_stations: "800",
                sub_type: "Diamond",
                duration: "31 Days",
              },
              {
                name: "Company  ABC",
                no_of_stations: "800",
                sub_type: "Diamond",
                duration: "31 Days",
              },
              {
                name: "Company  ABC",
                no_of_stations: "800",
                sub_type: "Diamond",
                duration: "31 Days",
              },
              {
                name: "Company  ABC",
                no_of_stations: "800",
                sub_type: "Diamond",
                duration: "31 Days",
              },
              {
                name: "Company  ABC",
                no_of_stations: "800",
                sub_type: "Diamond",
                duration: "31 Days",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default ControlSubscribers;
