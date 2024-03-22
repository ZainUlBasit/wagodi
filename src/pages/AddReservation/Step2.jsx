import React, { useEffect, useState } from "react";
import AuthInput from "../../components/Input/AuthInput";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/Input/Formik/CustomInput";
import AddingLightLoader from "../../components/Loaders/AddingLightLoader";
import AuthInputPopOver from "../../components/Input/AuthInputPopOver";
import { useSelector } from "react-redux";
import { Popover, Typography } from "@mui/material";

const Step2 = ({
  ProccessingData,
  CurrentTabNumber,
  setCurrentTabNumber,
  state,
  FormData,
  formik,
  Loading,
}) => {
  const [GasType, setGasType] = useState("");
  const AllDrivers = useSelector((state) => state.Drivers.data);
  const [UOM, setUOM] = useState("Liters");
  const [BalanceVolume, setBalanceVolume] = useState("");
  const [RequireVolume, setRequireVolume] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setGasType(
      state.type === 0
        ? "91"
        : state.type === 1
        ? "95"
        : state.type === 2
        ? "D"
        : ""
    );
    setBalanceVolume(state.value);
  }, []);

  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex flex-col gap-x-10 mt-10 shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] justify-between rounded-[15px] fade-in mb-5">
      <div className="w-auto p-10 flex-wrap flex gap-x-10 justify-center rounded-[15px]">
        {/* left side */}
        <div className="flex flex-col gap-y-5">
          <CustomInput
            name="fuel_type"
            label={"Gas Type"}
            placeholder={"95"}
            type="text"
            disabled={true}
            value={
              formik.values.fuel_type === 0
                ? "91"
                : formik.values.fuel_type === 1
                ? "95"
                : formik.values.fuel_type === 2
                ? "D"
                : ""
            }
          />
          <CustomInput
            name="uom"
            label={"UOM"}
            placeholder={"Litre"}
            type="text"
            disabled={true}
            value={"Litres"}
          />
          {/* <CustomInput
            name="value"
            label={"Balance Volume"}
            placeholder={"20,000"}
            disabled={true}
            type="number"
            value={formik.values.cur_value}
          /> */}
        </div>
        {/* right side */}
        <div className="flex flex-col gap-y-5">
          {/* <CustomInput
            name="fuel_value"
            label={"Require Volume"}
            placeholder={"36,000"}
            type="number"
            value={formik.values.fuel_value}
            onChange={formik.handleChange}
            touched={formik.touched.fuel_value}
            isError={formik.errors.fuel_value}
            errorMsg={formik.errors.fuel_value}
          /> */}
          {/* <CustomInput
            name="paid_amount"
            label={"Paid Amount"}
            placeholder={"Add Amount..."}
            type="number"
            value={
              formik.values.from_option === 0
                ? formik.values.vendor_price * formik.values.fuel_value
                : formik.values.paid_amount
            }
            onChange={formik.handleChange}
            touched={formik.touched.paid_amount}
            isError={formik.errors.paid_amount}
            errorMsg={formik.errors.paid_amount}
            disabled={formik.values.from_option === 0 ? true : false}
          /> */}
          <AuthInputPopOver
            label={"Assign Driver (Optional)"}
            placeholder={"Select Driver..."}
            Value={formik.values.driver_name || "Select Driver..."}
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
                  {AllDrivers.map((driver) => {
                    return (
                      <div
                        className="flex gap-x-3 items-center cursor-pointer"
                        onClick={() => {
                          handleClose();
                          formik.setFieldValue("driver_name", driver.name);
                          formik.setFieldValue("driver_id", driver._id);
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                          checked={formik.values.driver_id === driver._id}
                        />
                        <span>{driver.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Typography>
          </Popover>
          {/* <AuthInput
            label={"Require Volume"}
            placeholder={"36,000"}
            required={false}
            Value={RequireVolume}
            setValue={setRequireVolume}
          /> */}
        </div>
      </div>
      {Loading ? (
        <div className="w-full gap-x-3 flex justify-center items-center mb-10">
          <AddingLightLoader />
        </div>
      ) : (
        <div className="w-full gap-x-3 flex justify-center items-center mb-10">
          <button
            className={`mt-[20px] w-[150px] h-fit py-2 text-[#90898E] hover:text-white hover:bg-[#90898E] rounded-[40px] bg-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out border-2 border-[#90898E]`}
            onClick={() => navigate("/home")}
          >
            Cancel
          </button>
          <button
            className={`mt-[20px] w-[150px] h-fit py-2 bg-[#90898E] border-2 border-[#90898E] hover:border-[#465462] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
            onClick={formik.handleSubmit}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Step2;
