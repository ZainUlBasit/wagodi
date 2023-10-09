import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { FaChevronDown } from "react-icons/fa";
import { Popover, Typography } from "@mui/material";
import { BsPlusCircle, BsSearch } from "react-icons/bs";
import UserTable from "../../components/Tables/UserTable";

const Users = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [Filter, setFilter] = useState("");
  const [UserID, setUserID] = useState("");
  const [OpenEditModal, setOpenEditModal] = useState(false);

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
      <div className="flex flex-col justify-center items-center w-full">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex justify-between mt-6 mb-10">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[1.3rem] gap-x-3 flex items-center justify-center">
            <span className="text-[30px] font-[600]">Role</span>
            <span
              className="flex items-center gap-x-[20px] bg-[#465462] rounded-full px-3 py-1 h-fit text-white font-[Quicksand] cursor-pointer"
              onClick={handleClick}
            >
              All <FaChevronDown aria-describedby={id} variant="contained" />
            </span>
            {/* <LuFilter
              className="text-[2rem] cursor-pointer"
              onClick={handleClick}
            /> */}
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
                  marginTop: "6px",
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Typography
                sx={{
                  p: 3,
                  pb: 4,
                  pl: 4,
                  pr: 4,
                  borderColor: "#465462",
                  backgroundColor: "#465462",
                  width: "400px",
                  overflow: "hidden",
                  borderRadius: "25px",
                }}
              >
                <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                  <div className="font-[Quicksand] font-[700] text-[1.5rem] mb-3">
                    Select Role
                  </div>
                  <p className="h-[2px] w-[90%] bg-[#FFFFFF5C] mb-3 rounded-full"></p>
                  <div className="w-full flex flex-col justify-between gap-y-3 pt-3 items-start">
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => setFilter("Administrator")}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={Filter === "Administrator"}
                      />
                      <span>Administrator</span>
                    </div>
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => setFilter("Order Manager")}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={Filter === "Order Manager"}
                      />
                      <span>Order Manager</span>
                    </div>
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => setFilter("Driver")}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={Filter === "Driver"}
                      />
                      <span>Driver</span>
                    </div>
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => setFilter("Station manager")}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={Filter === "Station manager"}
                      />
                      <span>Station manager</span>
                    </div>
                    <div className="flex w-full justify-center">
                      <button
                        className={`mt-[10px] w-[197px] h-fit py-2 bg-[#90898E] hover:bg-[white] hover:text-[#90898E] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                        onClick={() => {}}
                      >
                        Show
                      </button>
                    </div>
                  </div>
                </div>
              </Typography>
            </Popover>
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4">
            <button
              className={`border-2 border-[#465462] px-4 py-[5px] rounded-3xl font-[Quicksand] font-[700] bg-[#fff] text-[#465462] transition-all duration-500 ease-in-out flex gap-x-6 items-center hover:text-white hover:bg-[#465462]`}
              //   onClick={() => setOpenSendReport(!OpenSendReport)}
            >
              <span className="px-3">Create</span>
              <BsPlusCircle />
            </button>
          </div>
        </div>
        <div className="w-[90%] max-w-[1200px] border-[1px] border-[#465462] shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] mb-10 relative mt-6">
          <div className="flex justify-between items-center px-5 text-white font-[Quicksand] absolute -top-9 left-[-1px] w-[calc(100%+2px)] bg-[#465462] rounded-[15px]">
            <div className="flex border-[1px] w-[300px] border-white items-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden my-[10px]">
              <BsSearch className="text-[1.2rem]" />
              <input
                className="outline-none bg-inherit text-white w-full"
                placeholder="Search Station name"
              />
            </div>
          </div>
          <UserTable setUserID={setUserID} setOpen={setOpenEditModal} />
        </div>
      </div>
      {/* Create Modal and Implement */}
      {/* {OpenEditModal && } */}
    </>
  );
};

export default Users;
