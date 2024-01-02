import React, { useState } from "react";
import OrderManagerNavbar from "../Navbar/OrderManagerNavbar";
import AuthInput from "../Input/AuthInput";
import { BiDownload } from "react-icons/bi";

const OrderInfo = () => {
  const [ReqDateTime, setReqDateTime] = useState("21-Sep-23    11:30PM");
  const [GasType, setGasType] = useState("95");
  const [UOM, setUOM] = useState("Liters");
  const [BalanceVolume, setBalanceVolume] = useState("20,000");
  const [RequiredVolume, setRequiredVolume] = useState("36,000");
  const [IssuedVolume, setIssuedVolume] = useState("10,000");
  const [RecievedVolume, setRecievedVolume] = useState("10,000");
  const [DeliveredDateTime, setDeliveredDateTime] = useState(
    "19-Sep-23    11:30PM"
  );

  return (
    <>
      {/* <OrderManagerNavbar /> */}
      <div className="w-full flex flex-col items-center justify-center fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex flex-col justify-between mt-6">
          {/* Left */}
          <div className="font-[Quicksand] font-[600] text-[2rem]">
            Receipt No: <span className="font-[400]">1231236512456</span>
          </div>
        </div>
        <div className="w-full flex  flex-col justify-center items-center mt-10">
          <div className="w-[800px] shadow-[rgba(0,0,0,0.24)_0px_3px_8px] flex justify-between flex-wrap px-14 py-10 rounded-[20px]">
            {/* left side */}
            <div className="flex flex-col">
              <AuthInput
                label="Required Date and Time"
                placeholder="21-Sep-23    11:30PM"
                required={false}
                Value={ReqDateTime}
                setValue={setReqDateTime}
              />
              <AuthInput
                label="Gas Type"
                placeholder="95"
                required={false}
                Value={GasType}
                setValue={setGasType}
              />
              <AuthInput
                label="UOM"
                placeholder="Liters"
                required={false}
                Value={UOM}
                setValue={setUOM}
              />
              <AuthInput
                label="Balance Volume"
                placeholder="20,000"
                required={false}
                Value={BalanceVolume}
                setValue={setBalanceVolume}
              />
            </div>
            {/* right side */}
            <div>
              <AuthInput
                label="Required Volume"
                placeholder="36,000"
                required={false}
                Value={RequiredVolume}
                setValue={setRequiredVolume}
              />
              <AuthInput
                label="Issued Volume"
                placeholder="36,000"
                required={false}
                Value={IssuedVolume}
                setValue={setIssuedVolume}
              />
              <AuthInput
                label="Recieved Volume"
                placeholder="36,000"
                required={false}
                Value={RecievedVolume}
                setValue={setRecievedVolume}
              />
              <AuthInput
                label="Delivered Date and Time"
                placeholder="19-Sep-2023      10:43 PM"
                required={false}
                Value={DeliveredDateTime}
                setValue={setDeliveredDateTime}
              />
            </div>
            <div className="w-full flex justify-center items-center mt-5">
              <button className="text flex items-center w-fit gap-x-2 border-[2px] border-[#96ADC5] hover:bg-[#96ADC5] hover:text-white px-2 py-2 text-[#465462] font-bold rounded-[10px] transition-all duration-500 ease-in-out">
                <BiDownload className="text-[1.5rem]" /> Download Station Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInfo;
