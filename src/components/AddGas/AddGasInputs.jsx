import React, { useState } from "react";
import AuthInput from "../Input/AuthInput";
import GasInput from "../Input/GasInput";
import { BsChevronDown } from "react-icons/bs";
import { Popover, Typography } from "@mui/material";
import WarningToast from "../Toast/WarningToast";

const AddGasInputs = ({ AllGases, setAllGases, setShowAddGassInputs }) => {
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
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="flex items-center gap-x-4 max767:flex-wrap justify-center">
          <div
            className="relative mb-[15px] w-[120px] font-[Quicksand] cursor-pointer"
            onClick={handleClick}
          >
            <p className="absolute top-[-11px] left-3 w-fit bg-white font-[Quicksand] text-[15px] font-bold">
              Fuel Type
            </p>
            <div className="pl-3 py-2 border border-gray-300 rounded-[7.94px] w-full outline-none cursor-pointer">
              {FuelType === "" ? "Type" : FuelType}
            </div>
            <BsChevronDown className="flex absolute right-3 top-[.85rem]" />
          </div>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            PaperProps={{
              sx: {
                borderRadius: "20px", // Add rounded corners
                backgroundColor: "white", // Set background color to white
                width: "120px", // Set the width as needed
                overflow: "hidden", // Hide overflowing content
                marginTop: "5px",
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
                pl: 2,
                pr: 5,
                pb: 2,
                borderColor: "#465462",
                backgroundColor: "#465462",
                // width: "400px",
                overflow: "hidden",
                borderRadius: "20px",
              }}
            >
              <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                  {["91", "95", "D"].map((page_, i) => {
                    return (
                      <div
                        className="flex gap-x-3 items-center cursor-pointer"
                        onClick={() => {
                          setFuelType(page_);
                          handleClose();
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                          checked={page_ === FuelType}
                        />
                        <span>{page_}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Typography>
          </Popover>
          <GasInput
            type={"number"}
            label={"Capacity"}
            placeholder={"5"}
            required={false}
            Value={FuelCapacity}
            setValue={setFuelCapacity}
          />
          <GasInput
            type={"number"}
            label={"Initial Volume"}
            placeholder={"5"}
            required={false}
            Value={FuelVolume}
            setValue={setFuelVolume}
          />
          <GasInput
            type={"number"}
            label={"Selling price/Liter"}
            placeholder={"10,000"}
            required={false}
            Value={SellingPrice}
            setValue={setSellingPrice}
            last={true}
          />
        </div>
        <button
          className={`mb-[13px] w-[120px] h-fit py-1 bg-[#90898E] hover:bg-[#465462] rounded-[30px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
          onClick={() => {
            if (FuelType === "" || FuelVolume === "" || SellingPrice === "") {
              alert("All field are mandatory");
            } else {
              const isFuelTypeExist = AllGases.some(
                (gas) => gas.type === FuelType
              );
              if (isFuelTypeExist) {
                WarningToast("Fuel type already exists");
              } else {
                setAllGases([
                  ...AllGases,
                  {
                    type: FuelType,
                    max_value: Number(FuelCapacity),
                    value: Number(FuelVolume),
                    price_litre: Number(SellingPrice),
                  },
                ]);
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

export default AddGasInputs;
