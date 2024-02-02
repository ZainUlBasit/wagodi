import React, { useEffect, useRef, useState } from "react";
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
import { api } from "../../Https";
import { useSelector } from "react-redux";
import ErrorToast from "../../components/Toast/ErrorToast";
import { captureComponent } from "../../utility/utilityFunctions";
import PageLoader from "../../components/Loaders/PageLoader";

const OrderReports = () => {
  const [OpenSendReport, setOpenSendReport] = useState(false);
  const [SearchText, setSearchText] = useState("");
  const [CurDate, setCurDate] = useState("");
  const userData = useSelector((state) => state.auth.data);
  const [anchorEl, setAnchorEl] = useState(null);
  const [SendType, setSendType] = useState("");
  const [Loading, setLoading] = useState(true);
  let firstTime = 0;
  const [orders, setOrders] = useState([]);
  const previousDate = useRef();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const requestBody = { companyId: userData.companyId._id };
  const id = open ? "simple-popover" : undefined;
  const currentDate = CurDate
    ? Math.floor(new Date(CurDate).getTime() / 1000)
    : Math.floor(new Date().getTime() / 1000);

  useEffect(() => {
    setLoading(true);
    if (CurDate) {
      requestBody.end_date = currentDate;
      const currentMonth = new Date(CurDate).getMonth();
      const start_date = new Date(currentDate * 1000);
      start_date.setMonth(currentMonth - 1);
      requestBody.start_date = Math.floor(start_date.getTime() / 1000);
      // requestBody.end_date = date - ;
    }
    console.log(firstTime == 0);
    console.log(CurDate != previousDate);
    firstTime == 0 || CurDate != previousDate
      ? (async () => {
          const data = await api.post("/order/company", requestBody);
          const apiSuccess = data?.data?.success;
          firstTime++;
          if (!apiSuccess) {
            ErrorToast("Failed fetching data for orders!");
            return;
          }
          previousDate.current = CurDate;
          setOrders(data.data.data);
          setLoading(false);
        })()
      : "";
  }, [CurDate]);

  return (
    <>
      <div
        id="capture-component"
        className="flex flex-col justify-center items-center w-full fade-in"
      >
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
        {Loading ? (
          <PageLoader />
        ) : (
          orders
            ?.filter((order) => {
              console.log(order);
              if (SearchText === "") return order;
              else {
                if (order.station.id.name.toLowerCase().includes(SearchText))
                  return order;
              }
            })
            .map((orderData) => {
              return (
                <>
                  <div className="w-[90%] max-w-[1200px] maxWeb1:max-w-[1900px] maxWeb2:max-w-[2500px] maxWeb3:max-w-[3800px] maxWeb4:max-w-[3400px] border-[1px] border-[#465462] shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] mb-10 relative">
                    <div className="flex justify-between items-center text-white font-[Quicksand] absolute -top-5 left-[-1px] w-[calc(100%+2px)] h-[44px] maxWeb1:h-[60px] maxWeb2:h-[70px] maxWeb3:h-[80px] maxWeb4:h-[80px] rounded-[15px] bg-[#465462] overflow-hidden">
                      <ApprovedOrderTableTop Data={orderData} />
                    </div>
                    <ApprovedOrderTable Data={orderData} />
                  </div>
                </>
              );
            })
        )}
      </div>
      {OpenSendReport && (
        <SendReport Open={OpenSendReport} setOpen={setOpenSendReport} />
      )}
    </>
  );
};

export default OrderReports;
