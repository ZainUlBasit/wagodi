import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import AuthInput from "../Input/AuthInput";
import AuthInputPopOver from "../Input/AuthInputPopOver";
import { Popover, Typography } from "@mui/material";
import AuthTextArea from "../Input/AuthTextArea";
import AuthInputPassword from "../Input/AuthInputPassword";
import { FaPlus } from "react-icons/fa";
import AddGasInputs from "../AddGas/AddGasInputs";

const AddStation = ({ Open, setOpen }) => {
  const [StationNumber, setStationNumber] = useState("");
  const [StationName, setStationName] = useState("");
  const [Address, setAddress] = useState("");

  const [AllGases, setAllGases] = useState([]);
  const [NumberOfGases, setNumberOfGases] = useState([]);

  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div>
        <h1 className="w-full text-center font-[700] text-3xl py-8 font-[Quicksand] mb-4">
          Add Station
        </h1>
        <div>
          <div className="flex gap-x-10 px-10">
            {/* left */}
            <div>
              <AuthInput
                label="Station Number"
                placeholder="123"
                required={false}
                Value={StationNumber}
                setValue={setStationNumber}
              />
              <AuthInput
                label="Station Name"
                placeholder="123"
                required={false}
                Value={StationName}
                setValue={setStationName}
              />
            </div>
            {/* right */}
            <div>
              <AuthTextArea
                label={"Address"}
                placeholder={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
                }
                required={false}
                Value={Address}
                setValue={setAddress}
              />
            </div>
          </div>
          {AllGases.map((ag) => {
            return (
              <div className="ml-5">
                <span>Gas Type:</span> {ag.type} | {ag.volume} | {ag.price}
              </div>
            );
          })}
          {NumberOfGases.map((ng) => (
            <AddGasInputs
              setAllGases={setAllGases}
              AllGases={AllGases}
              setNumberOfGases={setNumberOfGases}
            />
          ))}
          {/* Show data of array */}
          <div className="flex flex-col ml-10 mb-10">
            <label
              htmlFor="file-input"
              className="cursor-pointer flex items-center w-fit border-[1px] border-[#DCDCDC] py-[5px] px-[20px] pl-[10px] rounded-[7.94px] text-[13.9px]"
              onClick={() => {
                setNumberOfGases([...NumberOfGases, ""]);
              }}
            >
              <FaPlus className="text-[#465462] text-[1.1rem] font-bold mr-5 ml-2" />
              Add Gas
            </label>
          </div>
          {/* buttons */}
          <div className="w-full flex justify-center items-center gap-x-5 mb-5">
            <button
              className={`mt-[5px] mb-[30px] w-[197px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
              onClick={() => {}}
            >
              Add
            </button>
            <button
              className={`mt-[5px] mb-[30px] w-[197px] border-[1px] border-[#90898E] h-fit py-2 bg-[#fff] hover:bg-[#465462] rounded-[40px] text-[#90898E] hover:text-[#fff] text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default AddStation;
