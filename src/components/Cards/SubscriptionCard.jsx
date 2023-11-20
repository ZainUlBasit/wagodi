import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { Popover, Typography } from "@mui/material";

const SubscriptionCard = ({ month }) => {
  const Range = ["1 - 10", "10 - 30", "30 - 50", "50 - 100", "100+"];
  const [CurrentRange, setCurrentRange] = useState("1 - 10");
  const [CurrentRangeIndex, setCurrentRangeIndex] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="w-[250px] flex flex-col justify-center items-center font-[Quicksand]">
      <div className="py-4 font-[600] text-[1.5rem]">Month {month}</div>
      <div className="border border-black rounded-[15px] p-3">
        <div className="flex items-center font-[400] mb-1">
          <AiFillCheckCircle className="text-[#56636F] pr-1 text-2xl" />
          <div className="flex items-center w-full justify-between pl-1 font-[400] text-[1.2rem]">
            700 SR per Station
          </div>
        </div>
        <div className="flex items-center font-[400]">
          <AiFillCheckCircle className="text-[#56636F] pr-1 text-2xl" />
          <div className="flex items-center w-full justify-between pl-1 font-[400] text-[1.2rem]">
            {CurrentRange}
            <BiChevronDown
              className="text-[1.6rem] cursor-pointer"
              onClick={handleClick}
            />
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
                    {Range.map((range, i) => {
                      return (
                        <div
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            handleClose();
                            setCurrentRange(range);
                            setCurrentRangeIndex(i);
                          }}
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={CurrentRange === range}
                          />
                          <span>{range}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Typography>
            </Popover>
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <button
            className={`mt-[20px] mb-[10px] w-[117px] max767:w-[120px] py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1rem] font-[700] transition-all duration-500 ease-in-out`}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
