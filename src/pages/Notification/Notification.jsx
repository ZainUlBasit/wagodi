import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NotificationTable from "../../components/Tables/NotificationTable";
import { BiSolidChevronRight } from "react-icons/bi";
import "../../assets/Style/style.css";
import MobNavbar from "../../components/Navbar/MobNavbar";
import { useDispatch, useSelector } from "react-redux";
import {
  FilterNotifications,
  fetchNotification,
} from "../../store/Slices/NotificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const Current_User = useSelector((state) => state.auth.data);
  const Current_Notification = useSelector((state) => state.Notifications);
  const [FromDate, setFromDate] = useState("");
  const [ToDate, setToDate] = useState("");

  useEffect(() => {
    // Function to format date in "YYYY-MM-DD" format
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Get current year and today's date
    const currentDate = new Date();
    const currentYearStart = new Date(currentDate.getFullYear(), 0, 1); // Start of current year

    // Set FromDate to current year start date and ToDate to today's date
    setFromDate(formatDate(currentYearStart));
    setToDate(formatDate(currentDate));
  }, []);

  useEffect(() => {
    dispatch(FilterNotifications({ FromDate, ToDate }));
  }, [FromDate, ToDate]);

  useEffect(() => {
    dispatch(fetchNotification(Current_User, Current_User?.role, {}));
  }, [Current_User]);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] maxWeb1:max-w-[1900px] maxWeb2:max-w-[2500px] maxWeb3:max-w-[3800px] maxWeb4:max-w-[3400px] flex justify-between mt-6">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem] max767:text-[1.8rem]">
            General Notifications
          </div>
          {/* Right */}
          <div className="font-[Quicksand] font-[700] flex gap-x-2 items-center max767:hidden">
            <div className="relative w-[200px]">
              <p className="absolute top-[-11px] left-4 px-[4px] w-fit bg-white font-[Quicksand] text-[15px]">
                From
              </p>
              <input
                type="date"
                name="fromdate"
                id="fromdate"
                value={FromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-3 py-2 pr-2 border border-[#E8E8E8] rounded-[7.94px] w-full outline-none"
              />
            </div>
            <div className="text-[1.5rem] flex justify-center items-center">
              <BiSolidChevronRight />
            </div>
            <div className="relative w-[200px]">
              <p className="absolute top-[-11px] left-4 px-[4px] w-fit bg-white font-[Quicksand] text-[15px]">
                To
              </p>
              <input
                type="date"
                name="todate"
                id="todate"
                value={ToDate}
                className="px-3 py-2 pr-2 border border-[#E8E8E8] rounded-[7.94px] w-full outline-none"
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-[90%] max-w-[1200px] maxWeb1:max-w-[1900px] maxWeb2:max-w-[2500px] maxWeb3:max-w-[3800px] maxWeb4:max-w-[3400px] mb-10 relative mt-6 fade-in">
          <NotificationTable Data={Current_Notification?.data} />
        </div>
      </div>
    </>
  );
};

export default Notification;
