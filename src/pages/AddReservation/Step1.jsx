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
import WarningToast from "../../components/Toast/WarningToast";
import CustomInput from "../../components/Input/Formik/CustomInput";

const Step1 = ({ setCurrentTabNumber, CurrentTabNumber, formik }) => {
  const [StationName, setStationName] = useState("");
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
    formik.setFieldValue("file",file)
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
        <div className="flex flex-col gap-y-5">
          <CustomInput
            name="to_name"
            label="Station Name"
            placeholder="Station Name..."
            type="text"
            value={formik.values.to_name}
            onChange={formik.handleChange}
            touched={formik.touched.to_name}
            isError={formik.errors.to_name}
            errorMsg={formik.errors.to_name}
          />
          <CustomInput
            name="res_date"
            label={"Reservation Date"}
            placeholder={"19-Sep-2023"}
            type="date"
            value={formik.values.res_date}
            onChange={formik.handleChange}
            touched={formik.touched.res_date}
            isError={formik.errors.res_date}
            errorMsg={formik.errors.res_date}
          />
          <CustomInput
            name="reciept_number"
            label={"Receipt Number"}
            placeholder={"Add Receipt number..."}
            type="text"
            value={formik.values.reciept_number}
            onChange={formik.handleChange}
            touched={formik.touched.reciept_number}
            isError={formik.errors.reciept_number}
            errorMsg={formik.errors.reciept_number}
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
        <div className="flex flex-col gap-y-5">
          <CustomInput
            name="paid_amount"
            label={"Paid Amount"}
            placeholder={"Add Amount..."}
            type="number"
            value={formik.values.paid_amount}
            onChange={formik.handleChange}
            touched={formik.touched.paid_amount}
            isError={formik.errors.paid_amount}
            errorMsg={formik.errors.paid_amount}
          />
          <CustomInput
            name="arrival_date"
            label={"Arrival Date"}
            placeholder={"19-Sep-2023"}
            type="date"
            value={formik.values.arrival_date}
            onChange={formik.handleChange}
            touched={formik.touched.arrival_date}
            isError={formik.errors.arrival_date}
            errorMsg={formik.errors.arrival_date}
          />
          <AuthInputPopOver
            label={"Start Point Type"}
            placeholder={"Select Start Point..."}
            Value={
              formik.values.from_option === 0
                ? "Vendors"
                : formik.values.from_option === 1
                ? "Station"
                : ""
            }
            onClick={(data) => handleClick(data)}
          />
          {(formik.values.from_option === 0 ||
            formik.values.from_option === 1) && (
            <AuthInputPopOver
              label={"Start Point"}
              placeholder={
                formik.values.from_option === 0
                  ? "Select Vendor..."
                  : "Select Station..."
              }
              Value={formik.values.from_name}
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
                      formik.setFieldValue("from_option", 0);
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
                      formik.setFieldValue("from_option", 1);
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
                  {formik.values.from_option === 1 &&
                    StationsData?.data
                      .filter((dt) => dt.active)
                      .map((data) => {
                        return (
                          <div
                            className="flex gap-x-3 items-center cursor-pointer"
                            onClick={() => {
                              handleCloseEnd();
                              const checkFuel = data.populatedFuels.filter(
                                (fd) => {
                                  if (fd.type === formik.values.fuel_type) {
                                    formik.setFieldValue("fuel_id", fd._id);
                                    return fd;
                                  }
                                }
                              );
                              if (checkFuel.length) {
                                formik.setFieldValue("stationId", data._id);
                                formik.setFieldValue(
                                  "from_address",
                                  data.address
                                );
                                formik.setFieldValue("from_name", data.name);
                              } else {
                                WarningToast(
                                  "Selected Station Does't Contain Such Fuel Type!"
                                );
                              }
                            }}
                          >
                            <input
                              type="checkbox"
                              className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                              checked={formik.values.stationId === data._id}
                            />
                            <span>{data.name}</span>
                          </div>
                        );
                      })}
                  {formik.values.from_option === 0 &&
                    VendorsData?.data.map((data) => {
                      return (
                        <div
                          className="flex gap-x-3 items-center cursor-pointer"
                          onClick={() => {
                            handleCloseEnd();
                            formik.setFieldValue("vendorId", data._id);
                            formik.setFieldValue("from_address", data.address);
                            formik.setFieldValue("from_name", data.name);
                          }}
                        >
                          <input
                            type="checkbox"
                            className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                            checked={formik.values.vendorId === data._id}
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
          <CustomInput
            name="tip"
            label={"Add Tip"}
            placeholder={"Add Amount..."}
            type="number"
            value={formik.values.tip}
            onChange={formik.handleChange}
            touched={formik.touched.tip}
            isError={formik.errors.tip}
            errorMsg={formik.errors.tip}
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center mb-10">
        <button
          className={`mt-[20px] w-[197px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
          onClick={() => {
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
