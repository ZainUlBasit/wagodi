import React, { useEffect, useState } from "react";
import DateInput from "../../components/Input/DateInput";
import { BsSearch } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "../../components/Tables/EmployeeTable";
import AuthInputPopOver from "../../components/Input/AuthInputPopOver";
import { Popover, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchStations } from "../../store/Slices/StationSlice";
import { fetchEmployeeData } from "../../store/Slices/EmployeeSlice";
import moment from "moment";
import PageLoader from "../../components/Loaders/PageLoader";

const EmployeeData = () => {
  const [SearchText, setSearchText] = useState("");
  const [SearchPopOver, setSearchPopOver] = useState("");
  const [StationId, setStationId] = useState("");
  const [StationName, setStationName] = useState("");
  const [CurDate, setCurDate] = useState(moment().format("YYYY-MM-DD"));

  const dispatch = useDispatch();
  const StationsData = useSelector((state) => state.StationReducer);
  const Employee_Data = useSelector((state) => state.EmployeeData);
  const Auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchStations(Auth.data.companyId));
    console.log(EmployeeData);
    dispatch(fetchEmployeeData({ id: Auth.data.companyId._id, CurDate }));
  }, []);
  useEffect(() => {
    dispatch(fetchEmployeeData({ id: Auth.data.companyId._id, CurDate }));
  }, [CurDate]);

  const navigate = useNavigate();
  const handleArrowLeftClick = () => {
    // Navigate to the last visited route
    navigate(-1);
  };
  const [anchorEl, setAnchorEl] = useState(null);
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
      <div className="flex flex-col justify-center items-center">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex max767:flex-col justify-between mt-6 mb-10 flex-wrap gap-y-4">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem] flex items-center gap-x-4">
            <FaArrowLeft
              className="text-[1.4rem] cursor-pointer"
              onClick={handleArrowLeftClick}
            />
            Employee Data
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4  max767:w-full max767:justify-end  max767:mt-3 flex-wrap gap-y-4">
            <DateInput
              label="Date"
              required={false}
              Value={CurDate}
              setValue={setCurDate}
            />
            <AuthInputPopOver
              label={"Select Station"}
              placeholder={"Select Station..."}
              Value={StationName}
              onClick={(data) => handleClick(data)}
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
                  p: 2,
                  borderColor: "#465462",
                  backgroundColor: "#465462",
                  width: "400px",
                  overflow: "hidden",
                  borderRadius: "25px",
                }}
              >
                <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                  <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                    <div className="flex border-[1px] w-[260px] border-black items-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden bg-white">
                      <BsSearch className="text-black" />
                      <input
                        className="outline-none w-full text-black"
                        placeholder="Search Station name"
                        value={SearchPopOver}
                        onChange={(e) => setSearchPopOver(e.target.value)}
                      />
                    </div>
                    {StationsData.data
                      .filter((dt) => {
                        const lowerCaseSearch = SearchPopOver.toLowerCase();
                        const lowerCaseStation = dt.name.toLowerCase();
                        if (SearchPopOver !== "") {
                          return lowerCaseStation.includes(lowerCaseSearch);
                        } else {
                          return dt;
                        }
                      })
                      .map((data) => {
                        return (
                          <div
                            className="flex gap-x-3 items-center cursor-pointer"
                            onClick={() => {
                              handleClose();
                              setStationId(data._id);
                              setStationName(data.name);
                            }}
                          >
                            <input
                              type="checkbox"
                              className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                              checked={StationId === data._id}
                            />
                            <span>{data.name}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </Typography>
            </Popover>
            <div className="flex border-[1px] w-[300px] border-black items-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden">
              <BsSearch />
              <input
                className="outline-none w-full"
                placeholder="Search..."
                value={SearchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
        {Employee_Data.loading ? (
          <PageLoader />
        ) : (
          <>
            <div className="w-[90%] max-w-[1200px] border-[1px] border-[#465462] rounded-[30px] overflow-hidden shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px]">
              <EmployeeTable
                Data={Employee_Data.data.filter((dt) => {
                  if (StationName === "") return dt;
                  else return dt.stationName === StationName;
                })}
                Search={SearchText}
              />
            </div>
            <div className="w-[90%] max-w-[1200px] border-[1px] border-[#465462] rounded-[30px] overflow-hidden shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] flex justify-center px-5 py-3 mt-4">
              <div className="flex flex-col gap-x-[100px] pr-10 font-[Quicksand]">
                <div>
                  Total Volume: <span className="font-bold">500 L</span>
                </div>
                <div>
                  Total Amount: <span className="font-bold">500</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EmployeeData;
