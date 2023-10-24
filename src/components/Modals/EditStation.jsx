import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import AuthInput from "../Input/AuthInput";
import AuthInputPopOver from "../Input/AuthInputPopOver";
import { Popover, Typography } from "@mui/material";
import AuthTextArea from "../Input/AuthTextArea";
import AuthInputPassword from "../Input/AuthInputPassword";
import { FaPlus } from "react-icons/fa";
import AddGasInputs from "../AddGas/AddGasInputs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import AddGasInputsPrefilled from "../AddGas/AddGasInputsPrefilled";

const EditStation = ({ Open, setOpen, CurrentStation }) => {
  const [StationNumber, setStationNumber] = useState("");
  const [StationName, setStationName] = useState("");
  const [Address, setAddress] = useState("");
  const [EditIndex, setEditIndex] = useState("");

  useEffect(() => {
    // console.log(CurrentStation[0].Gasses);
    setStationName(CurrentStation[0].StationName);
    setStationNumber(CurrentStation[0].StationNumber);
    setAddress(CurrentStation[0].Address);
    setAllGases(CurrentStation[0].Gasses);
    // console.log(CurrentStation[0].Gasses);
  }, []);

  const [AllGases, setAllGases] = useState([]);
  const [ShowAddGassInputs, setShowAddGassInputs] = useState(false);
  const [ShowAddGassInputsPrefilled, setShowAddGassInputsPrefilled] =
    useState(false);

  const deleteGas = (index) => {
    const updatedGases = [...AllGases];
    updatedGases.splice(index, 1);
    setAllGases(updatedGases);
  };

  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div>
        <h1 className="w-full text-center font-[700] text-3xl py-8 font-[Quicksand] mb-4">
          Edit Station
        </h1>
        <div>
          <div className="flex gap-x-10 px-10 max767:flex-col max767:items-center">
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
          {/* Show data of array of Gasses */}
          {AllGases.map((ag, index) => {
            if (index === EditIndex) {
              return (
                <AddGasInputsPrefilled
                  setAllGases={setAllGases}
                  AllGases={AllGases}
                  setShowAddGassInputsPrefilled={setShowAddGassInputsPrefilled}
                  CurrentGas={AllGases[EditIndex]}
                  index={EditIndex}
                  setEditIndex={setEditIndex}
                />
              );
            }
            return (
              <div className="ml-10 flex gap-x-2 my-3 font-[Quicksand] text-[13.9px]">
                <span className="font-[700]">Gas Type:</span>
                <div className="flex font-[Quicksand] font-[300] items-center">
                  <div className="w-[60px] border-r-[1px] border-r-[#606060]">
                    {ag.type}
                  </div>
                  <div className="w-[60px] border-r-[1px] border-r-[#606060] text-center">
                    {ag.volume}
                  </div>
                  <div className="w-[60px] text-right">{ag.price}</div>
                  <RiDeleteBin6Line
                    onClick={() => deleteGas(index)}
                    className="ml-4 text-[1.2rem] cursor-pointer hover:text-[red] transition-all duration-500"
                  />
                  <BiEdit
                    onClick={() => {
                      setShowAddGassInputsPrefilled(true);
                      setEditIndex(index);
                    }}
                    className="ml-1 text-[1.2rem] cursor-pointer hover:text-[green] transition-all duration-500"
                  />
                </div>
              </div>
            );
          })}
          {/* show input field when Add Gas Button clicked */}
          {ShowAddGassInputs && (
            <AddGasInputs
              setAllGases={setAllGases}
              AllGases={AllGases}
              setShowAddGassInputs={setShowAddGassInputs}
            />
          )}
          <div className="flex flex-col ml-10 mb-10">
            <label
              htmlFor="file-input"
              className="cursor-pointer flex items-center w-fit border-[1px] border-[#DCDCDC] py-[5px] px-[20px] pl-[10px] rounded-[7.94px] text-[13.9px]"
              onClick={() => {
                setShowAddGassInputs(true);
              }}
            >
              <FaPlus className="text-[#465462] text-[1.1rem] font-bold mr-5 ml-2" />
              Add Gas
            </label>
          </div>
          {/* buttons */}
          <div className="w-full flex justify-center items-center gap-x-5 mb-5">
            <button
              className={`mt-[5px] mb-[30px] w-[197px] max767:w-[110px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
              onClick={() => {}}
            >
              Edit
            </button>
            <button
              className={`mt-[5px] mb-[30px] w-[197px] max767:w-[110px] border-[1px] border-[#90898E] h-fit py-2 bg-[#fff] hover:bg-[#465462] rounded-[40px] text-[#90898E] hover:text-[#fff] text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
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

export default EditStation;
