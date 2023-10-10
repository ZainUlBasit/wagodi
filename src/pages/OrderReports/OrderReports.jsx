import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { BsSearch } from "react-icons/bs";
import SendReport from "../../components/Modals/SendReport";
import ApprovedOrderTable from "../../components/Tables/ApprovedOrderTable";
import { ApprovedOrder } from "../../components/Tables/DemoData/ApprovedOrders";
import { FiDownload } from "react-icons/fi";
import { Popover, Typography } from "@mui/material";

const OrderReports = () => {
  const [OpenSendReport, setOpenSendReport] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [SendType, setSendType] = useState("");
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
      <div className="flex flex-col justify-center items-center w-full">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex justify-between mt-6 mb-10">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem]">
            Approved Orders
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
          </div>
        </div>
        {ApprovedOrder.filter((ao) => {
          if (SearchText === "") return ao;
          else {
            if (ao.StationName.startsWith(SearchText)) return ao;
          }
        }).map((AO) => {
          return (
            <>
              <div className="w-[90%] max-w-[1200px] border-[1px] border-[#465462] shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] mb-10 relative">
                <div className="flex justify-between items-center px-5 text-white font-[Quicksand] absolute -top-5 left-[-1px] w-[calc(100%+2px)] h-[44px] bg-[#465462] rounded-[15px]">
                  <div className="font-[700] text-[13.9px]">
                    RecieptNumber:
                    <span className="font-[400] ml-1">{AO.RecieptNumber}</span>
                  </div>
                  <div className="font-[700] text-[13.9px]">
                    StationName:
                    <span className="font-[400] ml-1">{AO.StationName}</span>
                  </div>
                  <div className="font-[700] text-[13.9px]">
                    PaidAmount:
                    <span className="font-[400] ml-1">{AO.PaidAmount}</span>
                  </div>
                  <div className="font-[700] text-[13.9px]">
                    DriverName:
                    <span className="font-[400] ml-1">{AO.DriverName}</span>
                  </div>
                  <div className="font-[700] text-[13.9px]">
                    PhoneNo:
                    <span className="font-[400] ml-1">{AO.PhoneNo}</span>
                  </div>
                  <div className="font-[700] text-[13.9px]">
                    Status:
                    <span className="font-[400] ml-1 bg-[#2EB100] px-3 py-[5px] rounded-full">
                      {AO.Status}
                    </span>
                  </div>
                  <div className="font-[700] text-[1.5rem] cursor-pointer ">
                    <FiDownload
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
                          width: "400px",
                          overflow: "hidden",
                          borderRadius: "20px",
                        }}
                      >
                        <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                          <div className="font-[Quicksand] font-[700] text-[1.5rem] mb-3">
                            Download
                          </div>
                          <p className="h-[2px] w-full bg-[#FFFFFF5C] mb-3 rounded-full"></p>
                          <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                            <div
                              className="flex gap-x-3 items-center cursor-pointer"
                              onClick={() => setSendType("Buying Receipt")}
                            >
                              <input
                                type="checkbox"
                                className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                                checked={SendType === "Buying Receipt"}
                              />
                              <span>Buying Receipt</span>
                            </div>
                            <div
                              className="flex gap-x-3 items-center cursor-pointer"
                              onClick={() =>
                                setSendType("Receiving Receipt (Driver)")
                              }
                            >
                              <input
                                type="checkbox"
                                className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                                checked={
                                  SendType === "Receiving Receipt (Driver)"
                                }
                              />
                              <span>Receiving Receipt (Driver)</span>
                            </div>
                            <div
                              className="flex gap-x-3 items-center cursor-pointer"
                              onClick={() =>
                                setSendType(
                                  "Receiving Receipt (Station Manager)"
                                )
                              }
                            >
                              <input
                                type="checkbox"
                                className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                                checked={
                                  SendType ===
                                  "Receiving Receipt (Station Manager)"
                                }
                              />
                              <span>Receiving Receipt (Station Manager)</span>
                            </div>
                            <div className="flex justify-center items-center w-full my-4">
                              <button
                                className={`mt-[20px] w-[197px] h-fit py-2 bg-[#90898E] hover:text-[#465462] hover:bg-white rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                                onClick={() => {}}
                              >
                                Download
                              </button>
                            </div>
                          </div>
                        </div>
                      </Typography>
                    </Popover>
                  </div>
                </div>
                <ApprovedOrderTable Data={AO} />
              </div>
            </>
          );
        })}
      </div>
      {OpenSendReport && (
        <SendReport Open={OpenSendReport} setOpen={setOpenSendReport} />
      )}
    </>
  );
};

export default OrderReports;
