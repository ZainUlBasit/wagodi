import React, { useState } from "react";
import CustomModal from "./CustomModal";
import AuthInput from "../Input/AuthInput";
import { ImCross } from "react-icons/im";

const ReservationDetails = ({ Open, setOpen, SelectedID }) => {
  const [OrderNumber, setOrderNumber] = useState("");
  const [StationName, setStationName] = useState("");
  const [ReservationDetails, setReservationDetails] = useState("");
  const [ReceiptNumber, setReceiptNumber] = useState("");
  const [PaidAmount, setPaidAmount] = useState("");
  const [ArrivalDate, setArrivalDate] = useState("");
  const [StartPoints, setStartPoints] = useState("");
  const [AddTip, setAddTip] = useState("");
  const [GasType, setGasType] = useState("");
  const [UOM, setUOM] = useState("");
  const [BalanceVolume, setBalanceVolume] = useState("");
  const [RequireVolume, setRequireVolume] = useState("");
  const [CursorOnCross, setCursorOnCross] = useState(false);
  return (
    <CustomModal open={Open} setOpen={setOpen}>
      {/* Main Wrapper */}
      <div className="pb-5">
        {/* title */}
        <div className="flex font-[Quicksand] font-[700] text-[1.5rem] py-6 pl-7">
          Reservation Details
          <div
            className="absolute right-4 border-2 p-2 rounded-full border-black hover:bg-black cursor-pointer"
            onMouseOver={() => setCursorOnCross(true)}
            onMouseOut={() => setCursorOnCross(false)}
            onClick={() => setOpen(false)}
          >
            <ImCross
              className={`${
                CursorOnCross ? "text-white" : "text-black"
              } text-[1rem] transition-all duration-500 ease-in-out`}
            />
          </div>
        </div>
        {/* body */}
        <div className="flex px-7 gap-x-4 max767:flex-col">
          {/* Left Side */}
          <div className="flex flex-col">
            <AuthInput
              label="Order Number"
              placeholder="50"
              required={false}
              Value={OrderNumber}
              setValue={setOrderNumber}
            />
            <AuthInput
              label="Station Name"
              placeholder="Station Name"
              required={false}
              Value={StationName}
              setValue={setStationName}
            />
            <AuthInput
              label="Reservation Date"
              placeholder="Reservation Date"
              required={false}
              Value={ReservationDetails}
              setValue={setReservationDetails}
            />
            <AuthInput
              label="Receipt Number"
              placeholder="Receipt Number..."
              required={false}
              Value={ReceiptNumber}
              setValue={setReceiptNumber}
            />
            <AuthInput
              label="Paid Amount"
              placeholder="Add Amount..."
              required={false}
              Value={PaidAmount}
              setValue={setPaidAmount}
            />
            <AuthInput
              label="Arrival Date"
              placeholder="Add Expected Date..."
              required={false}
              Value={ArrivalDate}
              setValue={setArrivalDate}
            />
            <AuthInput
              label="Start Points"
              placeholder="Select Start Point..."
              required={false}
              Value={StartPoints}
              setValue={setStartPoints}
            />
            <AuthInput
              label="Add Tip"
              placeholder="Add Amount..."
              required={false}
              Value={AddTip}
              setValue={setAddTip}
            />
          </div>
          {/* Right Side */}
          <div className="flex flex-col">
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
            <AuthInput
              label="Require Volume"
              placeholder="36,000"
              required={false}
              Value={RequireVolume}
              setValue={setRequireVolume}
            />
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ReservationDetails;
