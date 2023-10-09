import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import AuthInput from "../Input/AuthInput";
import AuthInputPopOver from "../Input/AuthInputPopOver";
import { Popover, Typography } from "@mui/material";
import { SiMicrosoftexcel } from "react-icons/si";
import { GrDocumentPdf } from "react-icons/gr";
import AuthBtn from "../buttons/AuthBtn";

const SendReport = ({ Open, setOpen }) => {
  const [Email, setEmail] = useState("");
  const [ReportType, setReportType] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [SendType, setSendType] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Email", Email);
    console.log("ReportType", ReportType);
    console.log("SendType", SendType);
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div className="flex w-[450px] flex-col items-center">
        <div className="flex w-full justify-center font-[Quicksand] font-[600] text-[25px] pb-3 pt-7">
          Send Report
        </div>
        <span className="w-[85%] h-[2px] bg-[#46546266] mb-[80px]"></span>
        <AuthInput
          label={"Email"}
          placeholder={"123@gmail.com"}
          required={false}
          Value={Email}
          setValue={setEmail}
        />
        <AuthInputPopOver
          label={"Report Type"}
          placeholder={"Select Report Type"}
          required={false}
          Value={ReportType}
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
              width: "300px", // Set the width as needed
              overflow: "hidden", // Hide overflowing content
              //   marginTop: "6px",
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
              <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                <div
                  className="flex gap-x-3 items-center cursor-pointer"
                  onClick={() => {
                    handleClose();
                    setReportType("Ordered");
                  }}
                >
                  <input
                    type="checkbox"
                    className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                    checked={ReportType === "Ordered"}
                  />
                  <span>Ordered</span>
                </div>
                <div
                  className="flex gap-x-3 items-center cursor-pointer"
                  onClick={() => {
                    handleClose();
                    setReportType("En Route");
                  }}
                >
                  <input
                    type="checkbox"
                    className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                    checked={ReportType === "En Route"}
                  />
                  <span>En Route</span>
                </div>
                <div
                  className="flex gap-x-3 items-center cursor-pointer"
                  onClick={() => {
                    handleClose();
                    setReportType("Delivered");
                  }}
                >
                  <input
                    type="checkbox"
                    className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                    checked={ReportType === "Delivered"}
                  />
                  <span>Delivered</span>
                </div>
              </div>
            </div>
          </Typography>
        </Popover>
        <div className="flex w-[297px] justify-between mt-7 mb-10">
          <div
            className="flex gap-x-3 items-center cursor-pointer"
            onClick={() => {
              setSendType("PDF");
            }}
          >
            <input
              type="checkbox"
              className="mr-1 appearance-none h-3 w-3 border border-gray-300 checked:bg-[#465462] rounded-full"
              checked={SendType === "PDF"}
            />
            <span className="flex items-center gap-x-1 font-[Quicksand] font-[700]">
              PDF <GrDocumentPdf />
            </span>
          </div>
          <div
            className="flex gap-x-3 items-center cursor-pointer"
            onClick={() => {
              setSendType("Excel");
            }}
          >
            <input
              type="checkbox"
              className="mr-1 appearance-none h-3 w-3 border border-gray-300 checked:bg-[#465462] rounded-full"
              checked={SendType === "Excel"}
            />
            <span className="flex items-center gap-x-1 font-[Quicksand] font-[700]">
              Excel <SiMicrosoftexcel />
            </span>
          </div>
        </div>
        <button
          className={`mb-10 w-[197px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
          onClick={onSubmit}
        >
          Send
        </button>
      </div>
    </CustomModal>
  );
};

export default SendReport;
