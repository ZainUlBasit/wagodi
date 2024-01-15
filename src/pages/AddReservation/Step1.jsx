import React, { useState } from "react";
import AuthInput from "../../components/Input/AuthInput";
import { FaPlus } from "react-icons/fa";

const Step1 = ({setCurrentTabNumber,CurrentTabNumber, formData}) => {
  const [StationName, setStationName] = useState("");
  const [ReservationDate, setReservationDate] = useState("");
  const [ReceiptNumber, setReceiptNumber] = useState("");
  const [PaidAmouunt, setPaidAmouunt] = useState("");
  const [ArrivalDate, setArrivalDate] = useState("");
  const [StartPoint, setStartPoint] = useState("");
  const [AddTip, setAddTip] = useState("");
  const [AddBuyingReceipt, setAddBuyingReceipt] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  return (
    <div className="w-[718px] flex flex-col gap-x-10 pt-[45px] mt-10 shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] justify-between h-[446px] rounded-[15px] fade-in">
      <div className="w-[718px] flex gap-x-10 justify-center rounded-[15px]">
        {/* left side */}
        <div>
          <AuthInput
            label={"Station Name"}
            placeholder={"Select Station Name..."}
            required={false}
            Value={StationName}
            setValue={setStationName}
          />
          <AuthInput
            label={"Reservation Date"}
            placeholder={"19-Sep-2023"}
            required={false}
            Value={ReservationDate}
            setValue={setReservationDate}
          />
          <AuthInput
            label={"Receipt Number"}
            placeholder={"Add Receipt number..."}
            required={false}
            Value={ReceiptNumber}
            setValue={setReceiptNumber}
          />
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
        <div>
          <AuthInput
            label={"Paid Amouunt"}
            placeholder={"Add Amount..."}
            required={false}
            Value={PaidAmouunt}
            setValue={setPaidAmouunt}
          />
          <AuthInput
            label={"Arrival Date"}
            placeholder={"Add Amount..."}
            required={false}
            Value={ArrivalDate}
            setValue={setArrivalDate}
          />
          <AuthInput
            label={"Start Point"}
            placeholder={"Select Start Point..."}
            required={false}
            Value={StartPoint}
            setValue={setStartPoint}
          />
          <AuthInput
            label={"Add Tip"}
            placeholder={"Add Amount..."}
            required={false}
            Value={AddTip}
            setValue={setAddTip}
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center mb-10">
        <button
          className={`mt-[20px] w-[197px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
          onClick={() => setCurrentTabNumber(CurrentTabNumber + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1;
