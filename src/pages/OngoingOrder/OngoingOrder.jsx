import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import OngoingOrdersTable from "../../components/Tables/OngoingOrdersTable";
import { LuFilter } from "react-icons/lu";
import { BsSearch } from "react-icons/bs";

const OngoingOrder = () => {
  const [Favourites, setFavourites] = useState(false);
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
    <>
      <Navbar />
      <div className="w-full flex flex-col justify-center items-center mb-5">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex justify-between mt-6 mb-5">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem]">
            Ordered Orders
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4">
            <button
              className={`border-2 border-[##90898E] px-4 py-1 rounded-3xl font-[Quicksand] font-[700] bg-[#90898E] text-white transition-all duration-500 ease-in-out`}
              onClick={() => setFavourites(!Favourites)}
            >
              Send Report
            </button>
            <div className="flex border-[1px] w-[300px] border-black items-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden">
              <BsSearch />
              <input className="outline-none" placeholder="Search Station name "/>
            </div>
            <LuFilter
              className="text-[2rem] cursor-pointer"
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            />
            {/* <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  borderRadius: "25px", // Add rounded corners
                  backgroundColor: "white", // Set background color to white
                  width: "400px", // Set the width as needed
                  overflow: "hidden", // Hide overflowing content
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
                  p: 5,
                  borderColor: "#465462",
                  backgroundColor: "#465462",
                  width: "400px",
                  overflow: "hidden",
                  borderRadius: "25px",
                }}
              >
                <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px] overflow-hidden">
                  <p className="h-[2px] w-[54px] bg-[#90898E]"></p>
                  <p className="h-[2px] w-full bg-[#FFFFFF5C] mt-7 mb-3 rounded-full"></p>

                  <div className="font-[Quicksand] font-[700] text-[1.8rem] mb-6">
                    Choose Your Filter
                  </div>
                  <div className="w-[260px] flex flex-col justify-between">
                    <div className="flex my-2 justify-between">
                      <div
                        className="rounded-[16px] bg-[#2EB100] px-4 py-2 w-[194px] font-[600] text-[1.2rem] text-center text-white font-[Quicksand] flex justify-center items-center cursor-pointer"
                        onClick={() => {
                          handleClose();
                          setFilter("Healthy");
                        }}
                      >
                        Healthy
                      </div>
                      <div className="h-full border-2 border-[#2EB100] px-5 py-2 text-[20px] font-[600] rounded-[10px]">
                        3
                      </div>
                    </div>
                    <div className="flex my-2 justify-between">
                      <div
                        className="rounded-[16px] bg-[#6877DC] px-4 py-2 w-[194px] font-[600] text-[1.2rem] text-center text-white font-[Quicksand] flex justify-center items-center cursor-pointer"
                        onClick={() => {
                          handleClose();
                          setFilter("BeReady");
                        }}
                      >
                        Be Ready
                      </div>
                      <div className="h-full border-2 border-[#6877DC] px-5 py-2 text-[20px] font-[600] rounded-[10px]">
                        7
                      </div>
                    </div>
                    <div className="flex my-2 justify-between">
                      <div
                        className="rounded-[16px] bg-[#C93D33] px-4 py-2 w-[194px] font-[600] text-[1.2rem] text-center text-white font-[Quicksand] flex justify-center items-center cursor-pointer"
                        onClick={() => {
                          setFilter("MakeOrder");
                          handleClose();
                        }}
                      >
                        Make an Order
                      </div>
                      <div className="h-full border-2 border-[#C93D33] px-4 py-2 text-[20px] font-[600] rounded-[10px]">
                        10
                      </div>
                    </div>
                  </div>
                </div>
              </Typography>
            </Popover> */}
          </div>
        </div>
        <div className="w-[90%] max-w-[1200px] border-[1px] border-black rounded-[10px] overflow-hidden shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px]">
          <OngoingOrdersTable />
        </div>
      </div>
    </>
  );
};

export default OngoingOrder;
