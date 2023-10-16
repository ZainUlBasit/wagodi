import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import SendReport from "../../components/Modals/SendReport";
import ApprovedOrderTable from "../../components/Tables/ApprovedOrderTable";
import { ApprovedOrder } from "../../components/Tables/DemoData/ApprovedOrders";
import { FiDownload } from "react-icons/fi";
import { Popover, Typography } from "@mui/material";
import DateInput from "../../components/Input/DateInput";
import MonthPicker from "../../components/Select/MonthPickerSelect";
import "../../assets/Style/style.css";
import OrderManagerNavbar from "../../components/Navbar/OrderManagerNavbar";
import { LuFilter } from "react-icons/lu";
import OrderDetail from "../../components/Cards/OrderDetail";

const OrderManagerOrderReports = () => {
  const [OpenSendReport, setOpenSendReport] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElF, setAnchorElF] = useState(null);
  const [SendType, setSendType] = useState("");
  const [SearchText, setSearchText] = useState("");
  const [CurDate, setCurDate] = useState("");

  const [Filter, setFilter] = useState("");
  const [ApplyFilter, setApplyFilter] = useState("");

  const handleClickF = (event) => {
    setAnchorElF(event.currentTarget);
  };

  const handleCloseF = () => {
    setAnchorElF(null);
  };

  const openF = Boolean(anchorElF);
  const idF = openF ? "simple-popover" : undefined;

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
      <OrderManagerNavbar />
      <div className="flex flex-col justify-center items-center w-full fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex justify-between mt-6 mb-10">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem]">
            Approved Orders
          </div>
        </div>
        <div className="w-[90%] max-w-[1200px] flex flex-wrap xl:justify-start justify-center items-center my-4">
          {/* <div className="grid grid-cols-3 gap-x-10 gap-y-5 w-[90%] max-w-[1200px] mb-4"> */}
          {ApprovedOrder.map((AO) => {
            return <OrderDetail Order={AO} />;
          })}
        </div>
      </div>
      {OpenSendReport && (
        <SendReport Open={OpenSendReport} setOpen={setOpenSendReport} />
      )}
    </>
  );
};

export default OrderManagerOrderReports;
