import React, { useEffect, useState } from "react";
import CustomPoperOverHome from "../../components/Popover/CustomPoperOverHome";
import { LuFilter } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { fetchStations } from "../../store/Slices/StationSlice";
import { BsChevronDown, BsSearch } from "react-icons/bs";
import { Popover, Typography } from "@mui/material";
import CompaniesInfoTable from "../../components/Tables/CompaniesInfoTable";
import { api } from "../../Https";
import ErrorToast from "../../components/Toast/ErrorToast";
import TableWrapper from "../../components/Tables/TableWrapper";
import { useTranslation } from "react-i18next";

const CompanyInfo = () => {
  const currentDate = new Date();
  const [Favourites, setFavourites] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [Filter, setFilter] = useState("");
  const [ApplyFilter, setApplyFilter] = useState("");
  const [Open, setOpen] = useState(false);
  const [SearchText, setSearchText] = useState("");
  const [CurrentStationName, setCurrentStationName] = useState("");
  const [anchorElMonth, setAnchorElMonth] = useState(null);
  const [CurrentMonth, setCurrentMonth] = useState(null);
  const [data, setData] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setFilter(ApplyFilter);
    setAnchorEl(null);
  };
  const handleClickMonth = (event) => {
    setAnchorElMonth(event.currentTarget);
  };

  const handleCloseMonth = () => {
    setAnchorElMonth(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const openMonth = Boolean(anchorElMonth);
  const idMonth = openMonth ? "simple-popover-month" : undefined;

  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.auth);

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
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const fetchCompaniesData = async () => {
      let month;
      let day;
      const requestBody = {};
      if (CurrentMonth) {
        month = months.findIndex(CurrentMonth);
        day = 1;
        const start_date = Math.floor(
          new Date(
            currentDate.getFullYear(),
            month || currentDate.getMonth(),
            day || currentDate.getDay()
          ).getTime() / 1000
        );
        const end_date = Math.floor(
          new Date(
            currentDate.getFullYear(),
            month + 1 || currentDate.getMonth() + 1,
            0
          ).getTime() / 1000
        );
        requestBody.start_date = start_date;
        requestBody.end_date = end_date;
      }
      try {
        const responseData = await api.post("/company/info-all", requestBody);
        console.log(responseData);
        if (responseData.data?.success)
          setData(responseData?.data?.data?.payload);
      } catch (error) {
        console.log(error);
        ErrorToast("Error fetching companies info!");
      }
      console.log(data);
    };
    fetchCompaniesData();
  }, [CurrentMonth]);
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] maxWeb1:max-w-[1900px] maxWeb2:max-w-[2500px] maxWeb3:max-w-[3800px] maxWeb4:max-w-[3400px] flex justify-between mt-6 flex-wrap">
          {/* Left */}
          <div className="text-[30px] font-[Quicksand] font-[600] maxWeb1:text-[3rem] maxWeb2:text-[3rem] maxWeb3:text-[3rem] maxWeb4:text-[3rem]">
            {t("CompaniesInformation")}
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4 flex-wrap">
            <div
              className="relative w-[180px] font-[Quicksand] cursor-pointer"
              onClick={handleClickMonth}
            >
              <p className="absolute top-[-11px] left-3 w-fit bg-white font-[Quicksand] text-[15px] font-bold">
                {t("Month")}
              </p>
              <div className="px-3 py-2 pr-10 border border-gray-300 rounded-[7.94px] w-full outline-none cursor-pointer">
                {CurrentMonth === null
                  ? "Select Month"
                  : t(`Months.${CurrentMonth}`)}
              </div>
              <BsChevronDown className="flex absolute right-3 top-[.85rem]" />
            </div>
            <div className="flex border-[1px] w-[300px] maxWeb1:w-[400px] maxWeb2:w-[450px] maxWeb3:w-[500px] maxWeb4:w-[550px] border-black items-center gap-x-2 px-3 py-[6px] maxWeb1:px-4 maxWeb1:py-[8px] maxWeb2:px-5 maxWeb2:py-[10px] rounded-full overflow-hidden my-[10px] maxWeb1:my-[15px] maxWeb2:my-[20px]">
              <BsSearch />
              <input
                className="outline-none w-full font-[Quicksand]"
                placeholder="Search Company name"
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
                    Choose Your Filter
                  </div>
                  <p className="h-[2px] w-[90%] bg-[#FFFFFF5C] mb-3 rounded-full"></p>
                  <div className="w-full flex flex-col justify-between gap-y-3 pt-3 items-start">
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => setFilter("Ascending")}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={Filter === "Ascending"}
                      />
                      <span>Ascending Earning</span>
                    </div>
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => setFilter("Descending")}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                        checked={Filter === "Descending"}
                      />
                      <span>Descending Earning</span>
                    </div>
                    <div className="flex w-full justify-center">
                      <button
                        className={`mt-[10px] w-[197px] h-fit py-2 bg-[#90898E] hover:bg-[white] hover:text-[#90898E] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                        onClick={() => {
                          handleClose();
                          setApplyFilter(Filter);
                          setFilter(Filter);
                        }}
                      >
                        Show
                      </button>
                    </div>
                  </div>
                </div>
              </Typography>
            </Popover>

            <Popover
              id={idMonth}
              open={openMonth}
              anchorEl={anchorElMonth}
              onClose={handleCloseMonth}
              PaperProps={{
                sx: {
                  borderRadius: "25px", // Add rounded corners
                  backgroundColor: "white", // Set background color to white
                  width: "300px", // Set the width as needed
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
                  borderRadius: "20px",
                  overflowY: "auto", // Make the content scrollable
                  maxHeight: "300px", // Set a maximum height as needed
                }}
              >
                <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                  <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                    {months.map((month, i) => {
                      return (
                        <div
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            handleCloseMonth();
                            setCurrentMonth(month);
                            // setCurrentMonthIndex(i);
                          }}
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={CurrentMonth === month}
                          />
                          <span>{t(`Months.${month}`)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Typography>
            </Popover>
          </div>
        </div>
        {/* Table */}
        <TableWrapper className="rounded-[30px] overflow-hidden">
          <CompaniesInfoTable
            Data={data.filter(
              (dt) =>
                SearchText === "" ||
                dt.company_name.toLowerCase().includes(SearchText.toLowerCase())
            )}
          />
        </TableWrapper>
      </div>
    </>
  );
};

export default CompanyInfo;
