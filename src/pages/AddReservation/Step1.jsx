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
import ErrorToast from "../../components/Toast/ErrorToast";
import { BsPlusCircle, BsTrash2Fill } from "react-icons/bs";
import AddStationsReservation from "../../components/Modals/AddStationsReservation";
import { Delete } from "@mui/icons-material";
import { BiTrash } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const Step1 = ({
  setCurrentTabNumber,
  setSelectedFile,
  selectedFile,
  CurrentTabNumber,
  formik,
}) => {
  const [t, i18n] = useTranslation("global");
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

  const removeStation = (index) => {
    const updatedStations = [...formik.values.stations];
    updatedStations.splice(index, 1);
    formik.setFieldValue("stations", updatedStations);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // formik.setFieldValue("attachment", e.currentTarget.files);
    formik.setFieldValue("attachment", e.target.files[0]);
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

  const CheckFuelTypeVendor = (data) => {
    return data.find((dt) => {
      return dt.type === formik.values.fuel_type;
    });
  };

  const [SelectModal, setSelectModal] = useState(false);

  return (
    <div className="w-full flex flex-col gap-x-10 mt-10 shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] justify-between items-center h-auto rounded-[15px] fade-in mb-5">
      <div className="p-10 flex-wrap flex-column-reverse flex gap-x-10 justify-center rounded-[15px]">
        {/* left side */}
        <div className="flex flex-col gap-y-5 mb-5">
          {/* <CustomInput
            name="to_name"
            label="Station Name"
            placeholder="Station Name..."
            type="text"
            disabled={true}
            value={formik.values.to_name}
            onChange={formik.handleChange}
            touched={formik.touched.to_name}
            isError={formik.errors.to_name}
            errorMsg={formik.errors.to_name}
          /> */}
          <CustomInput
            name="res_date"
            label={t("ReservationDetail.ReservationDate")}
            placeholder={"19-Sep-2023"}
            disabled={true}
            type="date"
            value={formik.values.res_date}
            onChange={formik.handleChange}
            touched={formik.touched.res_date}
            isError={formik.errors.res_date}
            errorMsg={formik.errors.res_date}
          />
          <CustomInput
            name="reciept_number"
            label={t("ReservationDetail.ReceiptNumber")}
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
          <CustomInput
            name={t("ReservationDetail.ArrivalDate")}
            label={t("ReservationDetail.ArrivalDate")}
            placeholder={"19-Sep-2023"}
            type="datetime-local"
            value={formik.values.arrival_date}
            onChange={formik.handleChange}
            touched={formik.touched.arrival_date}
            isError={formik.errors.arrival_date}
            errorMsg={formik.errors.arrival_date}
          />
          <CustomInput
            name="tip"
            label={t("ReservationDetail.AddTip")}
            placeholder={"Add Amount..."}
            type="number"
            value={formik.values.tip}
            onChange={formik.handleChange}
            touched={formik.touched.tip}
            isError={formik.errors.tip}
            errorMsg={formik.errors.tip}
          />
        </div>
        {/* right side */}
        <div className="flex flex-col gap-y-5">
          <AuthInputPopOver
            label={t("ReservationDetail.StartPointType")}
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
              label={t("ReservationDetail.StartPoint")}
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
          {/* Select Start Type Name */}
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
                    VendorsData?.data
                      .filter((dt) => {
                        const boolll = CheckFuelTypeVendor(dt.fuels);
                        console.log(boolll);
                        if (boolll) {
                          return dt;
                        }
                      })
                      .map((data) => {
                        console.log(data);
                        return (
                          <div
                            className="flex gap-x-3 items-center cursor-pointer"
                            onClick={() => {
                              let currentFuelData = data.fuels.find(
                                (fuel) => fuel.type === formik.values.fuel_type
                              );
                              // console.log(currentFuelData);
                              const currentFuelId = currentFuelData._id;
                              currentFuelData = currentFuelData?.price_litre;

                              formik.setFieldValue(
                                "from_fuel_id",
                                currentFuelId
                              );
                              formik.setFieldValue(
                                "vendor_price",
                                currentFuelData
                              );

                              formik.setFieldValue("from_long", data.longitude);
                              formik.setFieldValue("from_lat", data.latitude);
                              formik.setFieldValue("vendorId", data._id);
                              formik.setFieldValue(
                                "from_address",
                                data.address
                              );
                              formik.setFieldValue("from_name", data.name);
                              handleCloseEnd();
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
          <div className="flex flex-col w-[297px]">
            <label
              htmlFor="file-input"
              className="cursor-pointer flex items-center w-fit border-[1px] border-[#DCDCDC] py-[5px] px-[20px] pl-[10px] rounded-[7.94px] text-[13.9px]"
            >
              <FaPlus className="text-[#465462] text-[1.1rem] font-bold mr-5 ml-2" />
              {t("ReservationDetail.AddBuyingReceipt")}
            </label>
            {/* <input
              id="file-input"
              type="file"
              name="attachment"
              multiple
              onChange={handleFileChange}
            /> */}
            <input
              id="file-input"
              type="file"
              accept=".jpg, .jpeg, .png"
              className="hidden"
              onChange={handleFileChange}
            />
            {formik.values.attachment && (
              <div className="ml-3">{formik.values.attachment.name}</div>
            )}
          </div>
          {/* to stations */}
          <div>
            <div
              className="flex justify-between items-center"
              onClick={() => setSelectModal(true)}
            >
              <div className="font-bold text-xl">{t("stations")}</div>
              <BsPlusCircle className="text-2xl rounded-full cursor-pointer" />
            </div>
            <div className="flex flex-col gap-y-4 mt-2 items-center font-[Quicksand] w-[297px] flex-wrap">
              {formik.values.stations.map((station, i) => (
                <div className="flex justify-between w-full">
                  <div className="flex font-bold">
                    {`${i + 1}) ${station.name} (${
                      station.required_volume
                    } L) ${station.required_volume * station.current_price}`}
                  </div>
                  <BiTrash
                    className="hover:text-[red] text-2xl transition-all duration-700 cursor-pointer"
                    onClick={() => removeStation(i)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mb-10">
        <button
          className={`w-[197px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
          onClick={() => {
            if (
              formik.values.name !== "" &&
              formik.values.res_date !== "" &&
              formik.values.reciept_number !== "" &&
              // formik.values.paid_amount !== "" &&
              formik.values.arrival_date !== "" &&
              formik.values.attachment !== "" &&
              formik.values.from_option !== ""
            ) {
              if (
                (formik.values.stationId === "" &&
                  formik.values.from_option === 1) ||
                (formik.values.vendorId === "" &&
                  formik.values.from_option === 0)
              ) {
                ErrorToast("Required Fields is Undefined!");
              } else {
                setCurrentTabNumber(CurrentTabNumber + 1);
              }
            } else ErrorToast("Required Fields is Undefined!");
          }}
          else
        >
          Next
        </button>
      </div>
      {SelectModal && (
        <AddStationsReservation
          Open={SelectModal}
          setOpen={setSelectModal}
          formik={formik}
        />
      )}
    </div>
  );
};

export default Step1;
