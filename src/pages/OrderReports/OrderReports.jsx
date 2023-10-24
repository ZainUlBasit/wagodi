import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { BsSearch } from "react-icons/bs";
import SendReport from "../../components/Modals/SendReport";
import ApprovedOrderTable from "../../components/Tables/ApprovedOrderTable";
import { ApprovedOrder } from "../../components/Tables/DemoData/ApprovedOrders";
import { FiDownload } from "react-icons/fi";
import { Popover, Typography } from "@mui/material";
import DateInput from "../../components/Input/DateInput";
import MonthPicker from "../../components/Select/MonthPickerSelect";
import "../../assets/Style/style.css";
import MobNavbar from "../../components/Navbar/MobNavbar";
import SendReportDate from "../../components/Modals/SendReportDate";
import ApprovedOrderTableTop from "../../components/Tables/ApprovedOrderTableTop";

const OrderReports = () => {
  const [OpenSendReport, setOpenSendReport] = useState(false);
  const [SearchText, setSearchText] = useState("");
  const [CurDate, setCurDate] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const [SendType, setSendType] = useState("");
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
      <div className="flex flex-col justify-center items-center w-full fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex max767:flex-col justify-between mt-6 mb-10">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem]">
            Approved Orders
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4  max767:w-full max767:justify-end  max767:mt-3">
            <DateInput
              label="Date"
              required={false}
              Value={CurDate}
              setValue={setCurDate}
            />
            <button
              className={`border-2 border-[##90898E] px-4 py-1 rounded-3xl font-[Quicksand] font-[700] bg-[#90898E] text-white transition-all duration-500 ease-in-out`}
              onClick={() => setOpenSendReport(!OpenSendReport)}
            >
              Send Report
            </button>
            <div className="flex border-[1px] w-[300px] border-black items-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden max767:hidden">
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
            if (ao.StationName.toLowerCase().includes(SearchText)) return ao;
          }
        }).map((AO) => {
          return (
            <>
              <div className="w-[90%] max-w-[1200px] border-[1px] border-[#465462] shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] mb-10 relative">
                <div className="flex justify-between items-center text-white font-[Quicksand] absolute -top-5 left-[-1px] w-[calc(100%+2px)] h-[44px] rounded-[15px] bg-[#465462] overflow-hidden">
                  <ApprovedOrderTableTop Data={AO} />
                </div>
                <ApprovedOrderTable Data={AO} />
              </div>
            </>
          );
        })}
      </div>
      {OpenSendReport && (
        <SendReportDate Open={OpenSendReport} setOpen={setOpenSendReport} />
      )}
    </>
  );
};

export default OrderReports;
