import React, { useEffect, useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import { Popover, Typography } from "@mui/material";
import StatisticsTopTable from "../../components/Tables/StatisticsTopTable";
import DateInput from "../../components/Input/DateInput";
import StatisticsStationTable from "../../components/Tables/StatisticsStationTable";
import StatisticsDriverTable from "../../components/Tables/StatisticsDriverTable";
import StationReport from "../../components/Modals/StationReport";
import { StationStatisticsData } from "../../components/Tables/DemoData/StationStatisticsData";
import DriverReport from "../../components/Modals/DriverReport";
import Navbar from "../../components/Navbar/Navbar";
import MobNavbar from "../../components/Navbar/MobNavbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ApexChart from "./CustomChart";
import LineColumnChart from "./LineColumnChart";
import StationStatisticTopTable from "../../components/Tables/StationStatisticTopTable";
import SendReport from "../../components/Modals/SendReport";
import { Link } from "react-router-dom";
import { api } from "../../Https";
import { useDispatch, useSelector } from "react-redux";
import TableWrapper from "../../components/Tables/TableWrapper";
import "./Statistics.css";
import { BsSearch } from "react-icons/bs";
import { fetchCompanyStats } from "../../store/Slices/CompanyStatsSlice";
import { fetchStationStats } from "../../store/Slices/StationStatsSlice";

const Statistics = () => {
  const userData = useSelector((state) => state.auth.data);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [CurrentMonth, setCurrentMonth] = useState("");
  const [statsData, setStatsData] = useState("");
  const [CurrentMonthIndex, setCurrentMonthIndex] = useState("");
  const [CurrentMonthChart, setCurrentMonthChart] = useState("January");
  const [CurrentMonthIndexChart, setCurrentMonthIndexChart] = useState("0");
  const [CurrentMonthChart1, setCurrentMonthChart1] = useState("Month");
  const [CurrentMonthIndexChart1, setCurrentMonthIndexChart1] = useState("");
  const [CurDate, setCurDate] = useState("");
  const [CurrentTab, setCurrentTab] = useState("stations");
  const [OpenDetail, setOpenDetail] = useState(false);
  const [OpenDriverDetail, setOpenDriverDetail] = useState(false);
  const [CurrentID, setCurrentID] = useState("");
  const [SearchText, setSearchText] = useState("");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // for month
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // for month chart
  const [anchorElChart, setAnchorElChart] = React.useState(null);
  const handleClickChart = (event) => {
    setAnchorElChart(event.currentTarget);
  };
  const handleCloseChart = () => {
    setAnchorElChart(null);
  };
  const openChart = Boolean(anchorElChart);
  const idChart = openChart ? "simple-popover" : undefined;
  // for month chart 2
  const [anchorElChart2, setAnchorElChart2] = React.useState(null);
  const handleClickChart2 = (event) => {
    setAnchorElChart2(event.currentTarget);
  };
  const handleCloseChart2 = () => {
    setAnchorElChart2(null);
  };
  const openChart2 = Boolean(anchorElChart2);
  const idChart2 = openChart2 ? "simple-popover" : undefined;

  function generateYears(startYear, endYear) {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  }

  function generateDaysArray() {
    // Example usage:
    const year = new Date().getFullYear();
    const month = new Date().getMonth(); // Months are zero-based, so January is 0, February is 1, and so on.
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the total number of days in the month
    const daysArray = [];

    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(day);
    }

    return daysArray;
  }

  const [Years, setYears] = useState([]);
  const [Days, setDays] = useState([]);
  const [OpenSendReport, setOpenSendReport] = useState(false);
  const dispatch = useDispatch();
  const CompanyStats = useSelector((state) => state.CompanyStats);
  const StationStatsState = useSelector((state) => state.StationStats);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setDays(generateDaysArray());
    setYears(generateYears(currentYear - 10, currentYear));
    dispatch(fetchCompanyStats({ companyId: userData.companyId._id }));
    dispatch(fetchStationStats({ companyId: userData.companyId._id }));
  }, []);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center mb-5 fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex justify-between mt-6 mb-3">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem] max767:text-[1.3rem]">
            Station Statistics
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4">
            <Link
              to={"/employee-data"}
              className={`relative text-center text-lg tracking-[1px] no-underline text-[#fff] cursor-pointer transition-all ease-in-out duration-500 border-2 border-solid border-[#465462] hover:text-[white] shadow-[inset_0_0_0_0_#465462] hover:shadow-[inset_0_-100px_0_0_#465462] active:scale-90 px-4 py-[5px] rounded-full font-[Quicksand] font-[700] text-[1rem] bg-[#90898E] flex gap-x-6 items-center maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem] maxWeb4:text-[3rem]`}
            >
              Employee Data
            </Link>
            <div
              // className="px-4 py-[6px] border-2 border-white rounded-full cursor-pointer bg-[#465462] text-white"
              className={`relative text-center text-lg tracking-[1px] no-underline text-[#fff] cursor-pointer transition-all ease-in-out duration-500 border-2 border-solid border-[#465462] hover:text-[white] shadow-[inset_0_0_0_0_#465462] hover:shadow-[inset_0_-100px_0_0_#465462] active:scale-90 px-4 py-[5px] rounded-full font-[Quicksand] font-[700] text-[1rem] bg-[#90898E] flex gap-x-6 items-center maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem] maxWeb4:text-[3rem]`}
            >
              <div className="flex items-center">
                <input
                  type="text"
                  name="date"
                  id="date"
                  placeholder="Month"
                  value={CurrentMonth}
                  className="w-[100px] outline-none font-[700] text-[1.1rem] text-center placeholder:text-white bg-transparent"
                  disabled
                />
                <BiSolidChevronDown
                  className="text-[1.5rem] cursor-pointer"
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClick}
                />
              </div>
            </div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  borderRadius: "25px", // Add rounded corners
                  backgroundColor: "white", // Set background color to white
                  width: "fit", // Set the width as needed
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
                  // width: "400px",
                  overflow: "hidden",
                  borderRadius: "20px",
                }}
              >
                <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                  <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                    {months.map((month, i) => {
                      return (
                        <div
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            handleClose();
                            setCurrentMonth(month);
                            setCurrentMonthIndex(i);
                          }}
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={CurrentMonth === month}
                          />
                          <span>{month}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Typography>
            </Popover>
          </div>
        </div>
        {/* Top Table */}
        <TableWrapper className="rounded-[13px] overflow-hidden">
          <StatisticsTopTable StationInfo={CompanyStats.data} />
        </TableWrapper>

        <div className="flex justify-end w-[90%] mb-4 gap-x-3 gap-y-1 max767:flex-col max767:items-start">
          <button
            className={`relative text-center tracking-[1px] px-4 py-1 rounded-3xl font-[Quicksand] font-[700] bg-[#90898E] text-white no-underline text-#465462 cursor-pointer transition-all ease-in-out duration-500  border-2 border-solid border-[#90898E] hover:text-[white] shadow-[inset_0_0_0_0_#465462] hover:shadow-[inset_0_-100px_0_0_#465462] hover:border-[#465462] active:scale-90 flex items-center gap-x-2 justify-center`}
            onClick={() => setOpenSendReport(!OpenSendReport)}
          >
            Send Report
          </button>
          {/* show days, month and year as filter selected */}
          <div
            className={`relative text-center text-lg tracking-[1px] no-underline text-[#fff] cursor-pointer transition-all ease-in-out duration-500 border-2 border-solid border-[#465462] hover:text-[white] shadow-[inset_0_0_0_0_#465462] hover:shadow-[inset_0_-100px_0_0_#465462] active:scale-90 px-4 py-[5px] rounded-full font-[Quicksand] font-[700] text-[1rem] bg-[#90898E] flex gap-x-6 items-center maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem] maxWeb4:text-[3rem]`}
            // className="px-4 py-[6px] border-2 border-white rounded-full cursor-pointer bg-[#465462] text-white"
          >
            <div className="flex items-center">
              <input
                type="text"
                name="date"
                id="date"
                placeholder="Month"
                value={CurrentMonthChart}
                className="w-[100px] outline-none font-[700] text-[1.1rem] text-center placeholder:text-white bg-transparent"
                disabled
              />
              <BiSolidChevronDown
                className="text-[1.5rem] cursor-pointer"
                aria-describedby={idChart}
                variant="contained"
                onClick={handleClickChart}
              />
            </div>
          </div>
          {/* Select Month Year Days */}
          <div
            className={`relative text-center text-lg tracking-[1px] no-underline text-[#fff] cursor-pointer transition-all ease-in-out duration-500 border-2 border-solid border-[#465462] hover:text-[white] shadow-[inset_0_0_0_0_#465462] hover:shadow-[inset_0_-100px_0_0_#465462] active:scale-90 px-4 py-[5px] rounded-full font-[Quicksand] font-[700] text-[1rem] bg-[#90898E] flex gap-x-6 items-center maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem] maxWeb4:text-[3rem]`}
            // className="px-4 py-[6px] border-2 border-white rounded-full cursor-pointer bg-[#465462] text-white"
          >
            <div className="flex items-center">
              <input
                type="text"
                name="date"
                id="date"
                placeholder="Month"
                value={CurrentMonthChart1}
                className="w-[100px] outline-none font-[700] text-[1.1rem] text-center placeholder:text-white bg-transparent"
                disabled
              />
              <BiSolidChevronDown
                className="text-[1.5rem] cursor-pointer"
                aria-describedby={idChart2}
                variant="contained"
                onClick={handleClickChart2}
              />
            </div>
          </div>
          {/* show days, month and year as filter selected */}
          <Popover
            id={id}
            open={openChart}
            anchorEl={anchorElChart}
            onClose={handleCloseChart}
            PaperProps={{
              sx: {
                borderRadius: "25px",
                backgroundColor: "white",
                width: "fit",
                overflowY: "auto", // Enable vertical scrollbar when content overflows
                maxHeight: "60vh", // Set maximum height to 60% of the viewport height
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
                // width: "400px",
                overflow: "hidden",
                borderRadius: "20px",
              }}
            >
              <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                  {CurrentMonthChart1 === "Month" &&
                    months.map((month, i) => {
                      return (
                        <div
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            handleCloseChart();
                            setCurrentMonthChart(month);
                            setCurrentMonthIndexChart(i);
                          }}
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={CurrentMonthChart === month}
                          />
                          <span>{month}</span>
                        </div>
                      );
                    })}
                  {CurrentMonthChart1 === "Year" &&
                    Years.map((month, i) => {
                      return (
                        <div
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            handleCloseChart();
                            setCurrentMonthChart(month);
                            setCurrentMonthIndexChart(i);
                          }}
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={CurrentMonthChart === month}
                          />
                          <span>{month}</span>
                        </div>
                      );
                    })}
                  {CurrentMonthChart1 === "Days" &&
                    Days.map((month, i) => {
                      return (
                        <div
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            handleCloseChart();
                            setCurrentMonthChart(month);
                            setCurrentMonthIndexChart(i);
                          }}
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={CurrentMonthChart === month}
                          />
                          <span>{month}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </Typography>
          </Popover>
          {/* Select Month, Year or Days */}
          <Popover
            id={idChart2}
            open={openChart2}
            anchorEl={anchorElChart2}
            onClose={handleCloseChart2}
            PaperProps={{
              sx: {
                borderRadius: "25px", // Add rounded corners
                backgroundColor: "white", // Set background color to white
                width: "fit", // Set the width as needed
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
                // width: "400px",
                overflow: "hidden",
                borderRadius: "20px",
              }}
            >
              <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                  <div
                    className="flex gap-x-3 items-center cursor-pointer"
                    onClick={() => {
                      handleCloseChart2();
                      setCurrentMonthChart1("Days");
                      setCurrentMonthIndexChart1(i);
                    }}
                  >
                    <input
                      type="checkbox"
                      className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                      checked={CurrentMonthChart1 === "Days"}
                    />
                    <span>Days</span>
                  </div>
                  <div
                    className="flex gap-x-3 items-center cursor-pointer"
                    onClick={() => {
                      handleCloseChart2();
                      setCurrentMonthChart1("Month");
                      setCurrentMonthIndexChart1(i);
                    }}
                  >
                    <input
                      type="checkbox"
                      className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                      checked={CurrentMonthChart1 === "Month"}
                    />
                    <span>Month</span>
                  </div>
                  <div
                    className="flex gap-x-3 items-center cursor-pointer"
                    onClick={() => {
                      handleCloseChart2();
                      setCurrentMonthChart1("Year");
                      setCurrentMonthIndexChart1(i);
                    }}
                  >
                    <input
                      type="checkbox"
                      className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                      checked={CurrentMonthChart1 === "Year"}
                    />
                    <span>Year</span>
                  </div>
                </div>
              </div>
            </Typography>
          </Popover>
        </div>

        <div className="gap-x-5 flex-wrap w-[90%] flex justify-between max767:items-center max767:justify-center max1056:items-center max1056:justify-center mt-2">
          <div className="h-[360px] w-[500px] max767:w-auto overflow-scroll border-[1px] border-[#576370] MaxTableWidth">
            <StationStatisticTopTable />
          </div>
          <ApexChart />
          {/* test */}
        </div>
        <div className="w-[90%] flex justify-start">
          <div className="flex border-[1px] w-[300px] maxWeb1:w-[400px] maxWeb2:w-[450px] maxWeb3:w-[500px] maxWeb4:w-[550px] border-black items-center gap-x-2 px-3 py-[6px] maxWeb1:px-4 maxWeb1:py-[8px] maxWeb2:px-5 maxWeb2:py-[10px] rounded-full overflow-hidden my-[10px] maxWeb1:my-[15px] maxWeb2:my-[20px]">
            <BsSearch />
            <input
              className="outline-none w-full"
              placeholder="Search Company name"
              value={SearchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
        <LineColumnChart />

        <div className="w-[90%] flex justify-end">
          <DateInput
            label="Date"
            required={false}
            Value={CurDate}
            setValue={setCurDate}
          />
        </div>
        <div className="w-[90%] flex justify-center items-center bg-[#EFE7EC] rounded-[40px] font-[700] text-[1.5rem] mt-5 mb-8">
          <div
            className={`w-[50%] flex justify-center items-center rounded-[40px] ${
              CurrentTab === "stations"
                ? "bg-[#576370] text-white"
                : "bg-[#EFE7EC] text-[#576370]"
            } py-3 transition-all ease-in-out duration-700 cursor-pointer max767:py-2`}
            onClick={() => setCurrentTab("stations")}
          >
            Stations
          </div>
          <div
            className={`w-[50%] flex justify-center items-center rounded-[40px] ${
              CurrentTab === "drivers"
                ? "bg-[#576370] text-white"
                : "bg-[#EFE7EC] text-[#576370]"
            } py-3 transition-all ease-in-out duration-700 cursor-pointer max767:py-2`}
            onClick={() => setCurrentTab("drivers")}
          >
            Drivers
          </div>
        </div>
        <TableWrapper className="rounded-[20px] overflow-hidden">
          {CurrentTab === "stations" ? (
            <StatisticsStationTable
              setCurrentID={setCurrentID}
              setOpen={setOpenDetail}
              Data={StationStatsState.data}
            />
          ) : CurrentTab === "drivers" ? (
            <StatisticsDriverTable
              setCurrentID={setCurrentID}
              setOpen={setOpenDriverDetail}
            />
          ) : (
            <></>
          )}
        </TableWrapper>
      </div>
      {OpenDetail && (
        <StationReport
          StationName={StationStatisticsData[CurrentID].StationName}
          Open={OpenDetail}
          setOpen={setOpenDetail}
        />
      )}
      {OpenDriverDetail && (
        <DriverReport Open={OpenDriverDetail} setOpen={setOpenDriverDetail} />
      )}
      {OpenSendReport && (
        <SendReport Open={OpenSendReport} setOpen={setOpenSendReport} />
      )}
    </>
  );
};

export default Statistics;
