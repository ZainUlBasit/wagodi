import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import DriverDetailTable from "../Tables/DriverDetailTable";
import { Popover, Typography } from "@mui/material";
import { BiSolidChevronDown } from "react-icons/bi";

const DriverReport = ({ Open, setOpen, Data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [Loading, setLoading] = useState(false);
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

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // Adding 1 because getMonth() returns zero-based index (0 for January)
  const [CurrentMonth, setCurrentMonth] = useState(months[currentMonth]);
  const [CurrentMonthIndex, setCurrentMonthIndex] = useState(currentMonth);
  const [CurrentData, setCurrentData] = useState(Data);

  console.log("Current month:", currentMonth);

  useEffect(() => {
    setCurrentData(
      Data.filter((dt) => {
        const parsedDate = new Date(dt.date);
        // Get the month from the parsed date
        const userMonth = parsedDate.getMonth();
        return userMonth === CurrentMonthIndex;
      })
    );
  }, [CurrentMonth]);

  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div className="w-[900px] max767:w-auto">
        <div className="bg-[#56636F] text-white py-3 flex justify-center items-center border-b-[1px] border-b-white">
          <div
            className="flex items-center w-fit text-[#56636F] bg-white py-3 px-3 rounded-full"
            onClick={handleClick}
          >
            <input
              type="text"
              name="date"
              id="date"
              placeholder="Month"
              value={CurrentMonth}
              className="w-[100px] outline-none font-[700] text-[1.1rem] text-cente"
              disabled
            />
            <BiSolidChevronDown
              className="text-[1.5rem] cursor-pointer"
              aria-describedby={id}
              variant="contained"
            />
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
        <DriverDetailTable DriverData={CurrentData} />
      </div>
    </CustomModal>
  );
};

export default DriverReport;
