import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { LuFilter } from "react-icons/lu";
import StationDetail from "../../components/Cards/StationDetail";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { data } from "./DemoData";

const Home = () => {
  const [Favourites, setFavourites] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [Filter, setFilter] = useState("");

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
      {/* Main wrapper */}
      <div className="w-full flex flex-col items-center justify-center">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex justify-between mt-6">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem]">
            Stations
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4">
            <button
              className={`border-2 border-[#465462] px-4 py-1 rounded-3xl font-[Quicksand] font-[700] ${
                Favourites ? "bg-[#465462]" : "bg-white"
              } ${
                Favourites ? "text-white" : "text-[#465462]"
              } transition-all duration-500 ease-in-out`}
              onClick={() => setFavourites(!Favourites)}
            >
              Favorites
            </button>
            <LuFilter
              className="text-[2rem] cursor-pointer"
              aria-describedby={id}
              variant="contained"
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
            </Popover>
          </div>
        </div>
        {/* Body */}
        <div className="grid grid-cols-3 gap-x-3 gap-y-3 w-[90%] max-w-[1200px] mt-4">
          {data
            .filter((dt) => {
              if (Favourites) {
                console.log("Fav");
                if (Filter !== "" && Favourites === dt.favourites) {
                  if (Filter === dt.status) {
                    return dt;
                  }
                } else if (dt.favourites) {
                  return dt;
                }
              } else if (Filter !== "") {
                if (Filter === dt.status) {
                  return dt;
                }
              } else return dt;
            })
            .map((dt) => {
              return (
                <StationDetail
                  favourites={dt.favourites}
                  StationName={dt.StationName}
                  LastOrder={dt.LastOrder}
                  HiOctane={dt?.HiOctane || false}
                  HiOctaneCapacity={dt?.HiOctaneCapacity || 0}
                  Octane={dt?.Octane || false}
                  OctaneCapacity={dt?.OctaneCapacity || 0}
                  Diesel={dt?.Diesel || false}
                  DieselCapacity={dt?.DieselCapacity || 0}
                  status={dt.status}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
