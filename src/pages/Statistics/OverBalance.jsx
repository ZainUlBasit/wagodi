import React, { useEffect, useMemo, useState } from "react";
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
import { fetchWasteData } from "../../store/Slices/WasteSlice";
import WasteTable from "../../components/Tables/WasteTable";
import OverBalanceTable from "../../components/Tables/OverBalanceTable";

const FuelToEnum = (fuel) => {
  switch (fuel) {
    case "91":
      return 0;
    case "95":
      return 1;
    case "D":
      return 2;
  }
};

const OverBalance = () => {
  const [SearchText, setSearchText] = useState("");
  const [SearchPopOver, setSearchPopOver] = useState("");
  const [StationId, setStationId] = useState("");
  const [StationName, setStationName] = useState("");
  const [CurDate, setCurDate] = useState(moment().format("YYYY-MM-DD"));

  const dispatch = useDispatch();
  const StationsData = useSelector((state) => state.StationReducer);
  const Waste_Data = useSelector((state) => state.WasteState);
  const Auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchStations(Auth.data.companyId));
    dispatch(fetchWasteData({ id: Auth.data.companyId._id, CurDate }));
  }, []);
  useEffect(() => {
    dispatch(fetchWasteData({ id: Auth.data.companyId._id, CurDate }));
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

  const [anchorElType, setAnchorElType] = useState(null);
  const handleClickType = (event) => {
    setAnchorElType(event.currentTarget);
  };
  const handleCloseType = () => {
    setAnchorElType(null);
  };
  const openType = Boolean(anchorElType);
  const idType = openType ? "simple-popover" : undefined;

  const [FuelType, setFuelType] = useState("");

  const totalAmount = useMemo(() => {
    return Waste_Data?.data
      .filter((dt) => {
        const searchLowerCase = SearchText.toLowerCase();
        const employeeLowerCase = dt.stationName.toLowerCase();

        // Check if StationName is provided and matches
        const stationNameMatch =
          StationName === "" || dt.stationName === StationName;

        // Check if SearchText is provided and matches
        const searchTextMatch =
          SearchText === "" || employeeLowerCase.startsWith(searchLowerCase);

        const searchFuelType =
          FuelType === "" || FuelToEnum(FuelType) === dt.fuelType;

        // Return true if both conditions are met, otherwise false
        return stationNameMatch && searchTextMatch && searchFuelType;
      })

      .reduce((total, sale) => total + sale.amount, 0);
  }, [Waste_Data, StationName, SearchText, FuelType]);

  const totalSale = useMemo(() => {
    return Waste_Data?.data
      .filter((dt) => {
        const searchLowerCase = SearchText.toLowerCase();
        const employeeLowerCase = dt.stationName.toLowerCase();

        // Check if StationName is provided and matches
        const stationNameMatch =
          StationName === "" || dt.stationName === StationName;

        // Check if SearchText is provided and matches
        const searchTextMatch =
          SearchText === "" || employeeLowerCase.startsWith(searchLowerCase);

        const searchFuelType =
          FuelType === "" || FuelToEnum(FuelType) === dt.fuelType;

        // Return true if both conditions are met, otherwise false
        return stationNameMatch && searchTextMatch && searchFuelType;
      })
      .reduce((total, sale) => total + sale.fuelVolume, 0);
  }, [Waste_Data, StationName, SearchText, FuelType]);
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex max767:flex-col justify-between mt-6 mb-10 flex-wrap gap-y-4 flex-col">
          {/* Left */}
          <div className="font-[Quicksand] font-[700] text-[2rem] flex items-center gap-x-4">
            <FaArrowLeft
              className="text-[1.4rem] cursor-pointer"
              onClick={handleArrowLeftClick}
            />
            Over Balance
          </div>
          {/* Right */}
          <div className="flex items-center gap-x-4 justify-end  max767:w-full max767:justify-end  max767:mt-3 flex-wrap gap-y-4">
            <DateInput
              label="From"
              required={false}
              Value={CurDate}
              setValue={setCurDate}
            />
            <DateInput
              label="To"
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
                    <div
                      className="flex border-[1px] w-[260px] border-white items-center justify-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden bg-white text-[#465462] hover:bg-[#465462] hover:text-white transition-all duration-500 ease-in-out cursor-pointer font-bold"
                      onClick={() => {
                        handleClose();
                        setStationId("");
                        setStationName("");
                      }}
                    >
                      Clear Filter
                    </div>
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
            <div className="font-[Quicksand] font-bold bg-[#465462] text-white py-1 px-4 text-2xl rounded-lg">
              {Waste_Data.loading
                ? "-"
                : Waste_Data?.data.filter((dt) => {
                    const searchLowerCase = SearchText.toLowerCase();
                    const employeeLowerCase = dt.stationName.toLowerCase();

                    // Check if StationName is provided and matches
                    const stationNameMatch =
                      StationName === "" || dt.stationName === StationName;

                    // Check if SearchText is provided and matches
                    const searchTextMatch =
                      SearchText === "" ||
                      employeeLowerCase.startsWith(searchLowerCase);

                    const searchFuelType =
                      FuelType === "" || FuelToEnum(FuelType) === dt.fuelType;

                    // Return true if both conditions are met, otherwise false
                    return (
                      stationNameMatch && searchTextMatch && searchFuelType
                    );
                  }).length}
            </div>
            <div
              className="font-[Quicksand] font-bold bg-[#465462] text-white py-1 px-4 text-2xl rounded-lg"
              onClick={handleClickType}
            >
              {(FuelType && FuelType) || "-"}
            </div>

            <Popover
              id={idType}
              open={openType}
              anchorEl={anchorElType}
              onClose={handleCloseType}
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
                    <div
                      className="flex border-[1px] w-[260px] border-white items-center justify-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden bg-white text-[#465462] hover:bg-[#465462] hover:text-white transition-all duration-500 ease-in-out cursor-pointer font-bold"
                      onClick={() => {
                        handleCloseType();
                        setFuelType("");
                      }}
                    >
                      Clear Filter
                    </div>
                    {["91", "95", "D"].map((data, i) => {
                      return (
                        <div
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            handleCloseType();
                            setFuelType(data);
                          }}
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={data === FuelType}
                          />
                          <span>{data}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Typography>
            </Popover>
          </div>
        </div>
        {Waste_Data.loading ? (
          <PageLoader />
        ) : (
          <>
            <div className="w-[90%] max-w-[1200px] border-[1px] border-[#465462] rounded-[30px] overflow-hidden shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px]">
              <OverBalanceTable
                Data={Waste_Data.data.filter((dt) => {
                  const searchLowerCase = SearchText.toLowerCase();
                  const employeeLowerCase = dt.stationName.toLowerCase();

                  // Check if StationName is provided and matches
                  const stationNameMatch =
                    StationName === "" || dt.stationName === StationName;

                  // Check if SearchText is provided and matches
                  const searchTextMatch =
                    SearchText === "" ||
                    employeeLowerCase.startsWith(searchLowerCase);

                  const searchFuelType =
                    FuelType === "" || FuelToEnum(FuelType) === dt.fuelType;

                  // Return true if both conditions are met, otherwise false
                  return stationNameMatch && searchTextMatch && searchFuelType;
                })}
                Search={SearchText}
              />
            </div>
            <div className="w-[90%] max-w-[1200px] border-[1px] border-[#465462] rounded-[30px] overflow-hidden shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] flex justify-center px-5 py-3 mt-4">
              <div className="flex flex-col gap-x-[100px] pr-10 font-[Quicksand]">
                <div>
                  Total Volume:{" "}
                  <span className="font-bold">
                    {Number(totalSale).toFixed(2)} L
                  </span>
                </div>
                <div>
                  Total Amount:{" "}
                  <span className="font-bold">
                    {Number(totalAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OverBalance;
