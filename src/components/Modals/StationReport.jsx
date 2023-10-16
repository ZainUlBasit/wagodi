import React, { useState } from "react";
import CustomModal from "./CustomModal";
import MonthPicker from "../Select/MonthPickerSelect";
import { BiSolidChevronDown } from "react-icons/bi";
import { Popover, Typography } from "@mui/material";

const StationReport = ({ StationName, Open, setOpen }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const [CurrentMonth, setCurrentMonth] = useState("");
  const [CurrentMonthIndex, setCurrentMonthIndex] = useState("");
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
    <CustomModal title={StationName} open={Open} setOpen={setOpen}>
      <div className="flex flex-col justify-center">
        {/* header */}
        <div className="w-full text-center bg-[#465462] text-white font-[600] font-[Quicksand] text-[1.6rem] py-2 border-b-[1px] border-b-white rounded-t-[10px]">
          <span>{StationName}</span>
          <div className="px-4 py-[6px] bg-white border-2 border-white rounded-full text-black absolute top-[6px] right-6 cursor-pointer">
            <div className="flex items-center">
              <input
                type="text"
                name="date"
                id="date"
                placeholder="Month"
                value={CurrentMonth}
                className="w-[100px] outline-none font-[700] text-[1.1rem] text-center"
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
                width: "300px", // Set the width as needed
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
