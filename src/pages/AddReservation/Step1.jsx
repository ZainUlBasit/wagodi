import React, { useEffect, useState } from "react";
import AuthInput from "../../components/Input/AuthInput";
import { FaPlus } from "react-icons/fa";
import moment from "moment";
import AuthInputPopOver from "../../components/Input/AuthInputPopOver";
import { Popover, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchStations } from "../../store/Slices/StationSlice";
import { fetchVendors } from "../../store/Slices/VendorSlice";
import { StationData } from "../../components/Tables/DemoData/StationData";
import LocationSearchInput from "../../utility/LocationSearchInput";

const Step1 = ({
  setCurrentTabNumber,
  CurrentTabNumber,
  FormData,
  setFormData,
  s_name,
  s_id,
  setFromStation,
  setToStation,
  setProccessData,
}) => {
  const [StationName, setStationName] = useState(s_name);
  const [ReservationDate, setReservationDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [ReceiptNumber, setReceiptNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [PaidAmouunt, setPaidAmouunt] = useState("");
  const [ArrivalDate, setArrivalDate] = useState("");
  const [StartPoint, setStartPoint] = useState("");
  const [AddTip, setAddTip] = useState("");
  const [AddBuyingReceipt, setAddBuyingReceipt] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElEnd, setAnchorElEnd] = useState(null);
  const [OpenStation, setOpenStation] = useState(false);
  const [OpenVendor, setOpenVendor] = useState(false);
  const [StartPointType, setStartPointType] = useState("");
  const [NameEnd, setNameEnd] = useState("");
  const [IdEnd, setIdEnd] = useState("");
  const [AddressEnd, setAddressEnd] = useState("");
  // const [Long, setLong] = useState("");
  // const [Lat, setLat] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = ({ address, latLng }) => {
    setAddress(address);
  };

  const openEnd = Boolean(anchorElEnd);
  const idEnd = openEnd ? "simple-popover" : undefined;
  const handleClickEnd = (event) => {
    setAnchorElEnd(event.currentTarget);
  };
  const handleCloseEnd = () => {
    setAnchorElEnd(null);
  };
  const dispatch = useDispatch();
  const StationsData = useSelector((state) => state.StationReducer);
  const Auth = useSelector((state) => state.auth);
  const VendorsData = useSelector((state) => state.Vendor);
  useEffect(() => {
    dispatch(fetchStations(Auth.data.companyId));
    dispatch(fetchVendors(Auth.data.companyId));
  }, []);

  return (
    <div className="w-[718px] flex flex-col gap-x-10 pt-[45px] mt-10 shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] justify-between h-[446px] rounded-[15px] fade-in">
      <div className="w-[718px] flex gap-x-10 justify-center rounded-[15px]">
        {/* left side */}
        <div>
          <AuthInput
            label={"Station Name"}
            placeholder={"Select Station Name..."}
            required={false}
            Value={StationName}
            setValue={setStationName}
          />
          <AuthInput
            Type={"date"}
            label={"Reservation Date"}
            placeholder={"19-Sep-2023"}
            required={false}
            Value={ReservationDate}
            setValue={setReservationDate}
          />
          <AuthInput
            label={"Receipt Number"}
            placeholder={"Add Receipt number..."}
            required={false}
            Value={ReceiptNumber}
            setValue={setReceiptNumber}
          />
          {/* <LocationSearchInput onSelect={handleSelect} /> */}
          {/* <AuthInput
            label={"Location"}
            placeholder={"Enter Address..."}
            required={false}
            Value={Address}
            setValue={setAddress}
          /> */}
          <div className="flex flex-col">
            <label
              htmlFor="file-input"
              className="cursor-pointer flex items-center w-fit border-[1px] border-[#DCDCDC] py-[5px] px-[20px] pl-[10px] rounded-[7.94px] text-[13.9px]"
            >
              <FaPlus className="text-[#465462] text-[1.1rem] font-bold mr-5 ml-2" />
              Add Buying Receipt
            </label>
            <input
              id="file-input"
              type="file"
              accept=".jpg, .jpeg, .png"
              className="hidden"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <div className="ml-3">
                <p>Selected File: {selectedFile.name}</p>
              </div>
            )}
          </div>
        </div>
        {/* right side */}
        <div>
          <AuthInput
            label={"Paid Amount"}
            placeholder={"Add Amount..."}
            required={false}
            Value={PaidAmouunt}
            setValue={setPaidAmouunt}
          />
          <AuthInput
            label={"Arrival Date"}
            placeholder={"Add Amount..."}
            required={false}
            Value={ArrivalDate}
            setValue={setArrivalDate}
            Type={"date"}
          />
          <AuthInputPopOver
            label={"Start Point Type"}
            placeholder={"Select Start Point..."}
            Value={
              StartPointType === 0
                ? "Vendors"
                : StartPointType === 0
                ? "Station"
                : ""
            }
            onClick={(data) => handleClick(data)}
          />
          {(StartPointType === 0 || StartPointType === 1) && (
            <AuthInputPopOver
              label={"Start Point"}
              placeholder={
                StartPointType === 0 ? "Select Vendor..." : "Select Station..."
              }
              Value={NameEnd}
              onClick={(data) => handleClickEnd(data)}
            />
          )}
          {/* Select Start Type */}
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
                    className="flex gap-x-3 items-center cursor-pointer"
                    onClick={() => {
                      handleClose();
                      setOpenVendor(true);
                      setOpenStation(false);
                      setStartPointType(0);
                      setIdEnd("");
                      setNameEnd("");
                    }}
                  >
                    <input
                      type="checkbox"
                      className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                      checked={OpenVendor}
                    />
                    <span>Vendor</span>
                  </div>
                  <div
                    className="flex gap-x-3 items-center cursor-pointer"
                    onClick={() => {
                      handleClose();
                      setOpenVendor(false);
                      setOpenStation(true);
                      setStartPointType(1);
                      setIdEnd("");
                      setNameEnd("");
                    }}
                  >
                    <input
                      type="checkbox"
                      className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                      checked={OpenStation}
                    />
                    <span>Station</span>
                  </div>
                </div>
              </div>
            </Typography>
          </Popover>
          {/* Select Start Type */}
          <Popover
            id={idEnd}
            open={openEnd}
            anchorEl={anchorElEnd}
            onClose={handleCloseEnd}
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
                  {/* start data here */}
                  {StartPointType === 1 &&
                    StationsData?.data.map((data) => {
                      return (
                        <div
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            handleCloseEnd();
                            setIdEnd(data._id);
                            setNameEnd(data.name);
                            setAddressEnd(data.address);
                          }}
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={IdEnd === data._id}
                          />
                          <span>{data.name}</span>
                        </div>
                      );
                    })}
                  {StartPointType === 0 &&
                    VendorsData?.data.map((data) => {
                      return (
                        <div
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            handleCloseEnd();
                            setIdEnd(data._id);
                            setNameEnd(data.name);
                            setAddressEnd(data.address);
                          }}
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={IdEnd === data._id}
                          />
                          <span>{data.name}</span>
                        </div>
                      );
                    })}

                  {/* end data here */}
                </div>
              </div>
            </Typography>
          </Popover>
          <AuthInput
            label={"Add Tip"}
            placeholder={"Add Amount..."}
            required={false}
            Value={AddTip}
            setValue={setAddTip}
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center mb-10">
        <button
          className={`mt-[20px] w-[197px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
          onClick={() => {
            if (StartPointType === 0)
              setFormData({
                ...FormData,
                orderManagerId: Auth.data._id,
                companyId: Auth.data.companyId._id,
                location: Address,
                status: 0,
                receipt: ReceiptNumber,
                fuel_price: PaidAmouunt,
                expected_arrival: ArrivalDate,
                driverTip: AddTip,
                from: {
                  option: StartPointType,
                  vendorId: StartPointType === 0 ? IdEnd : "",
                  address: AddressEnd,
                },
                attachment: selectedFile,
              });
            else
              setFormData({
                ...FormData,
                orderManagerId: Auth.data._id,
                companyId: Auth.data.companyId._id,
                location: Address,
                status: 0,
                receipt: ReceiptNumber,
                fuel_price: PaidAmouunt,
                expected_arrival: ArrivalDate,
                driverTip: AddTip,
                from: {
                  option: StartPointType,
                  stationId: StartPointType === 1 ? IdEnd : "",
                  address: AddressEnd,
                },
                attachment: selectedFile,
              });
            setCurrentTabNumber(CurrentTabNumber + 1);
          }}
          else
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1;
