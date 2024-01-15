import React, { useState } from "react";
import OrderManagerNavbar from "../Navbar/OrderManagerNavbar";
import AuthInput from "../Input/AuthInput";
import { BiDownload } from "react-icons/bi";
import { useSelector } from "react-redux";
import { convertFuel } from "../../utility/utilityFunctions";

const OrderInfo = () => {
  const order = useSelector((state) => state.selectedOrder?.data);
  const ReqDateTime = order.expected_arrival ? new Date(order.expected_arrival).toLocaleDateString() : "not specified";
  const GasType = convertFuel(order.fuel_type);
  const UOM = "Liters";
  const BalanceVolume = order.fuel_receieved || "not specified"
  const RequiredVolume = order.fuel_value || "not specified"
  const IssuedVolume = order.station.fuel_value || "not specified"
  const RecievedVolume = order.station.fuel_recieved || "not specified"
  const DeliveredDateTime = order.station.deliveryTime ? new Date(order.station.deliveryTime).toLocaleDateString() : "not specified";

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
                readonly={true}
              />
              <AuthInput
                label="Gas Type"
                placeholder="95"
                required={false}
                Value={GasType}
                readonly={true}
              />
              <AuthInput
                label="UOM"
                placeholder="Liters"
                required={false}
                Value={UOM}
                readonly={true}
              />
              <AuthInput
                label="Balance Volume"
                placeholder="20,000"
                required={false}
                Value={BalanceVolume}
                readonly={true}
              />
            </div>
            {/* right side */}
            <div>
              <AuthInput
                label="Required Volume"
                placeholder="36,000"
                required={false}
                Value={RequiredVolume}
                readonly={true}
              />
              <AuthInput
                label="Issued Volume"
                placeholder="36,000"
                required={false}
                Value={IssuedVolume}
                readonly={true}
              />
              <AuthInput
                label="Recieved Volume"
                placeholder="36,000"
                required={false}
                readonly={true}
                Value={RecievedVolume}
              />
              <AuthInput
                label="Delivered Date and Time"
                placeholder="19-Sep-2023      10:43 PM"
                required={false}
                readonly={true}
                Value={DeliveredDateTime}
              />
            </div>
            <div className="w-full flex justify-center items-center mt-5">
              {order?.attachments.map( attachment => 
              <button className="text flex items-center w-fit gap-x-2 border-[2px] border-[#96ADC5] hover:bg-[#96ADC5] hover:text-white px-2 py-2 text-[#465462] font-bold rounded-[10px] transition-all duration-500 ease-in-out">
                <BiDownload className="text-[1.5rem]" /> {attachment.name}
              </button>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInfo;
