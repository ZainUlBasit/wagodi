import React, { useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import { Popover, Typography } from "@mui/material";
import StatisticsTopTable from "../../components/Tables/StatisticsTopTable";
import DateInput from "../../components/Input/DateInput";
import StatisticsStationTable from "../../components/Tables/StatisticsStationTable";
import StatisticsDriverTable from "../../components/Tables/StatisticsDriverTable";
import StationReport from "../../components/Modals/StationReport";
import { StationStatisticsData } from "../../components/Tables/DemoData/StationStatisticsData";
import DriverReport from "../../components/Modals/DriverReport";
import Navbar from "../../components/Navbar/Navbar";

const Statistics = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [CurrentMonth, setCurrentMonth] = useState("");
  const [CurrentMonthIndex, setCurrentMonthIndex] = useState("");
  const [CurDate, setCurDate] = useState("");
  const [CurrentTab, setCurrentTab] = useState("stations");
  const [OpenDetail, setOpenDetail] = useState(false);
  const [OpenDriverDetail, setOpenDriverDetail] = useState(false);
  const [CurrentID, setCurrentID] = useState("");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center mb-5 fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex justify-between mt-6 mb-3">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem]">
            Station Statistics
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4">
            <div className="px-4 py-[6px] border-2 border-white rounded-full text-black cursor-pointer bg-[#465462] text-white">
              <div className="flex items-center">
                <input
                  type="text"
                  name="date"
                  id="date"
                  placeholder="Month"
                  value={CurrentMonth}
                  className="w-[100px] outline-none font-[700] text-[1.1rem] text-center placeholder:text-white bg-[#465462]"
                  disabled
                />
                <BiSolidChevronDown
                  className="text-[1.5rem] cursor-pointer"
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClick}
                />
              </div>
            </div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  borderRadius: "25px", // Add rounded corners
                  backgroundColor: "white", // Set background color to white
                  width: "fit", // Set the width as needed
                  overflow: "hidden", // Hide overflowing content
                  marginTop: "10px",
                  boxShadow: "none",
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Typography
                sx={{
                  pt: 2,
                  pl: 4,
                  pr: 5,
                  pb: 5,
                  borderColor: "#465462",
                  backgroundColor: "#465462",
                  // width: "400px",
                  overflow: "hidden",
                  borderRadius: "20px",
                }}
              >
                <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                  <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                    {months.map((month, i) => {
                      return (
                        <div
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            handleClose();
                            setCurrentMonth(month);
                            setCurrentMonthIndex(i);
                          }}
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={CurrentMonth === month}
                          />
                          <span>{month}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Typography>
            </Popover>
          </div>
        </div>
        {/* Top Table */}
        <div className="w-[90%] max-w-[1200px] shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] mb-10 relative mt-1 overflow-hidden rounded-[15px]">
          <StatisticsTopTable />
        </div>
        <div className="w-[90%] flex justify-end">
          <DateInput
            label="Date"
            required={false}
            Value={CurDate}
            setValue={setCurDate}
          />
        </div>
        <div className="w-[90%] flex justify-center items-center bg-[#EFE7EC] rounded-[40px] font-[700] text-[1.5rem] mt-5 mb-8">
          <div
            className={`w-[50%] flex justify-center items-center rounded-[40px] ${
              CurrentTab === "stations"
                ? "bg-[#576370] text-white"
                : "bg-[#EFE7EC] text-[#576370]"
            } py-3 transition-all ease-in-out duration-700 cursor-pointer`}
            onClick={() => setCurrentTab("stations")}
          >
            Stations
          </div>
          <div
            className={`w-[50%] flex justify-center items-center rounded-[40px] ${
              CurrentTab === "drivers"
                ? "bg-[#576370] text-white"
                : "bg-[#EFE7EC] text-[#576370]"
            } py-3 transition-all ease-in-out duration-700 cursor-pointer`}
            onClick={() => setCurrentTab("drivers")}
          >
            Drivers
          </div>
        </div>
        <div className="w-[90%] max-w-[1200px] shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] mb-10 relative mt-6 rounded-[20px] overflow-hidden">
          {CurrentTab === "stations" ? (
            <StatisticsStationTable
              setCurrentID={setCurrentID}
              setOpen={setOpenDetail}
            />
          ) : CurrentTab === "drivers" ? (
            <StatisticsDriverTable
              setCurrentID={setCurrentID}
              setOpen={setOpenDriverDetail}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {OpenDetail && (
        <StationReport
          StationName={StationStatisticsData[CurrentID].StationName}
          Open={OpenDetail}
          setOpen={setOpenDetail}
        />
      )}
      {OpenDriverDetail && (
        <DriverReport Open={OpenDriverDetail} setOpen={setOpenDriverDetail} />
      )}
    </>
  );
};

export default Statistics;
