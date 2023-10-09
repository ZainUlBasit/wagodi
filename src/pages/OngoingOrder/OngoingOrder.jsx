import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import OngoingOrdersTable from "../../components/Tables/OngoingOrdersTable";
import { LuFilter } from "react-icons/lu";
import { BsSearch } from "react-icons/bs";
import { Popover, Typography } from "@mui/material";
import SendReport from "../../components/Modals/SendReport";
import ReservationDetails from "../../components/Modals/ReservationDetails";

const OngoingOrder = () => {
  const [Filter, setFilter] = useState("");
  const [OpenSendReport, setOpenSendReport] = useState(false);
  const [CurrentID, setCurrentID] = useState("");
  const [OpenReservationDetailsModal, setOpenReservationDetailsModal] =
    useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [SearchText, setSearchText] = useState("");

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
              onClick={() => setOpenSendReport(!OpenSendReport)}
            >
              Send Report
            </button>
            <div className="flex border-[1px] w-[300px] border-black items-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden">
              <BsSearch />
              <input
                className="outline-none w-full"
                placeholder="Search Station name"
                value={SearchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
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
                  marginTop: "6px",
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
                <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                  <div className="font-[Quicksand] font-[700] text-[1.5rem] mb-3">
                    Choose Your Filter
                  </div>
                  <p className="h-[2px] w-full bg-[#FFFFFF5C] mb-3 rounded-full"></p>
                  <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => setFilter("Ordered")}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={Filter === "Ordered"}
                      />
                      <span>Ordered</span>
                    </div>
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => setFilter("En Route")}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={Filter === "En Route"}
                      />
                      <span>En Route</span>
                    </div>
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => setFilter("Delivered")}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={Filter === "Delivered"}
                      />
                      <span>Delivered</span>
                    </div>
                  </div>
                </div>
              </Typography>
            </Popover>
          </div>
        </div>
        <div className="w-[90%] max-w-[1200px] border-[1px] border-[#465462] rounded-[30px] overflow-hidden shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px]">
          <OngoingOrdersTable
            Filter={Filter}
            Search={SearchText}
            setCurrentID={setCurrentID}
            setOpen={setOpenReservationDetailsModal}
          />
        </div>
      </div>
      {OpenSendReport && (
        <SendReport Open={OpenSendReport} setOpen={setOpenSendReport} />
      )}
      {OpenReservationDetailsModal && (
        <ReservationDetails
          Open={OpenReservationDetailsModal}
          setOpen={setOpenReservationDetailsModal}
          SelectedID={CurrentID}
        />
      )}
    </>
  );
};

export default OngoingOrder;
