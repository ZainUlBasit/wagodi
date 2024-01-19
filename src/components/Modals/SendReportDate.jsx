import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import AuthInput from "../Input/AuthInput";
import AuthInputPopOver from "../Input/AuthInputPopOver";
import { Popover, Typography } from "@mui/material";
import { SiMicrosoftexcel } from "react-icons/si";
import { GrDocumentPdf } from "react-icons/gr";
import AuthBtn from "../buttons/AuthBtn";
import AuthInputDate from "../Input/AuthInputDate";

const SendReportDate = ({ Open, setOpen}) => {
  const [Email, setEmail] = useState("");
  const [SelectedDate, setSelectedDate] = useState("");
  const [SendType, setSendType] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Email", Email);
    console.log("Date", SelectedDate);
    console.log("SendType", SendType);
    setOpen(false);
  };

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
        <AuthInputDate
          label={"Date"}
          required={false}
          Value={Email}
          setValue={setEmail}
        />
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

export default SendReportDate;
