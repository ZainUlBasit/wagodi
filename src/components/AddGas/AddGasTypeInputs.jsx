import React, { useState } from "react";
import AuthInput from "../Input/AuthInput";
import GasInput from "../Input/GasInput";
import { BsChevronDown } from "react-icons/bs";
import { Popover, Typography } from "@mui/material";
import WarningToast from "../Toast/WarningToast";

const AddGasTypeInputs = ({ AllGases, setAllGases, setShowAddGassInputs }) => {
  const [FuelType, setFuelType] = useState("");
  const [FuelCapacity, setFuelCapacity] = useState("");
  const [FuelVolume, setFuelVolume] = useState("");
  const [SellingPrice, setSellingPrice] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // const onClick = () => {};
  return (
    <>
      <div className="flex flex-col gap-x-5 items-center justify-center mt-8">
        <div className="flex items-center gap-x-4 max767:flex-wrap justify-center">
          <AuthInput
            Type="text"
            label="Gas Type"
            placeholder="Enter Gas Type..."
            required={true}
            Value={FuelType}
            setValue={setFuelType}
            disabled={false}
          />
        </div>
        <button
          className={`mb-[13px] w-[120px] h-fit py-1 bg-[#90898E] hover:bg-[#465462] rounded-[30px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
          onClick={() => {
            if (FuelType === "") {
              WarningToast("Select Type...");
            } else {
              const isFuelTypeExist = AllGases.some((gas) => gas === FuelType);
              if (isFuelTypeExist) {
                WarningToast("Fuel type already exists");
              } else {
                setAllGases([...AllGases, FuelType]);
                setShowAddGassInputs(false);
              }
            }
          }}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddGasTypeInputs;
