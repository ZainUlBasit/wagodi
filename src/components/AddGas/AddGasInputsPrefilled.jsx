import React, { useEffect, useState } from "react";
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
  const [FuelType, setFuelType] = useState(
    CurrentGas.type === 0 || Number(CurrentGas.type) === 91
      ? 91
      : CurrentGas.type === 1 || Number(CurrentGas.type) === 95
      ? 95
      : "D"
  );
  const [FuelCapacity, setFuelCapacity] = useState(CurrentGas.max_value);
  const [FuelVolume, setFuelVolume] = useState(CurrentGas.value);
  const [SellingPrice, setSellingPrice] = useState(CurrentGas.price_litre);

  useEffect(() => {
    console.log(FuelType, FuelCapacity, FuelVolume, SellingPrice);
  }, [FuelType, FuelCapacity, FuelVolume, SellingPrice]);

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="flex items-center gap-x-4 max767:flex-wrap justify-center">
          <GasInput
            label={"Fuel Type"}
            placeholder={"91"}
            required={false}
            Value={FuelType}
            setValue={setFuelType}
          />
          <GasInput
            label={"Capacity"}
            placeholder={"5"}
            required={false}
            Value={FuelCapacity}
            setValue={setFuelCapacity}
          />
          <GasInput
            label={"Initial Volume"}
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
            last={true}
          />
        </div>
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
                  console.log(FuelType);
                  if (i === index)
                    return {
                      type: FuelType,
                      max_value: FuelCapacity,
                      value: FuelVolume,
                      price_litre: SellingPrice,
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
