import React, { useState } from "react";
import AuthInput from "../Input/AuthInput";
import GasInput from "../Input/GasInput";

const AddGasInputs = ({ AllGases, setAllGases, setShowAddGassInputs }) => {
  const [FuelType, setFuelType] = useState("");
  const [FuelVolume, setFuelVolume] = useState("");
  const [SellingPrice, setSellingPrice] = useState("");
  return (
    <>
      <div className="flex items-center gap-x-4 ml-10 mt-8 max767:flex-wrap">
        <GasInput
          type={"text"}
          label={"Fuel Type"}
          placeholder={"91"}
          required={false}
          Value={FuelType}
          setValue={setFuelType}
        />
        <GasInput
          type={"number"}
          label={"Volume"}
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
        />
        <button
          className={`mb-[13px] w-[120px] h-fit py-1 bg-[#90898E] hover:bg-[#465462] rounded-[30px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
          onClick={() => {
            if (FuelType === "" || FuelVolume === "" || SellingPrice === "") {
              alert("All field are mandatory");
            } else {
              setAllGases([
                ...AllGases,
                {
                  type: FuelType,
                  volume: FuelVolume,
                  price: SellingPrice,
                },
              ]);
              setShowAddGassInputs(false);
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
