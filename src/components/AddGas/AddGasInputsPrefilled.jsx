import React, { useState } from "react";
import AuthInput from "../Input/AuthInput";
import GasInput from "../Input/GasInput";

const AddGasInputsPrefilled = ({
  AllGases,
  setAllGases,
  setShowAddGassInputsPrefilled,
  CurrentGas,
  index,
  setEditIndex,
}) => {
  const [FuelType, setFuelType] = useState(CurrentGas.type);
  const [FuelVolume, setFuelVolume] = useState(CurrentGas.volume);
  const [SellingPrice, setSellingPrice] = useState(CurrentGas.price);

  return (
    <>
      <div className="flex items-center gap-x-4 ml-10 mt-8">
        <GasInput
          label={"Fuel Type"}
          placeholder={"91"}
          required={false}
          Value={FuelType}
          setValue={setFuelType}
        />
        <GasInput
          label={"Volume"}
          placeholder={"5"}
          required={false}
          Value={FuelVolume}
          setValue={setFuelVolume}
        />
        <GasInput
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
              setShowAddGassInputsPrefilled(false);
              setEditIndex("");
              setAllGases(
                AllGases.map((ag, i) => {
                  if (i === index)
                    return {
                      type: FuelType,
                      volume: FuelVolume,
                      price: SellingPrice,
                    };
                  else return ag;
                })
              );
            }
          }}
        >
          Edit
        </button>
      </div>
    </>
  );
};

export default AddGasInputsPrefilled;
