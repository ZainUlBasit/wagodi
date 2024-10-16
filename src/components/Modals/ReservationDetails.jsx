import React, { useState } from "react";
import CustomModal from "./CustomModal";
import AuthInput from "../Input/AuthInput";
import { ImCross } from "react-icons/im";
import moment from "moment";
import { useTranslation } from "react-i18next";

const fuelTypeFunc = (type) => {
  switch (type) {
    case 0:
      return "91";
    case 1:
      return "95";
    case 2:
      return "D";
    default:
      return "unknown";
  }
};

const ReservationDetails = ({ Open, setOpen, SelectedID, data }) => {
  const [t, i18n] = useTranslation("global");
  const orderData = data.filter((dt) => dt._id === SelectedID)[0];
  // const [OrderNumber, setOrderNumber] = useState();
  // const [StationName, setStationName] = useState("");
  // const [ReservationDetails, setReservationDetails] = useState("");
  // const [ReceiptNumber, setReceiptNumber] = useState("");
  // const [PaidAmount, setPaidAmount] = useState("");
  // const [ArrivalDate, setArrivalDate] = useState("");
  // const [StartPoints, setStartPoints] = useState("");
  // const [AddTip, setAddTip] = useState("");
  // const [GasType, setGasType] = useState("");
  // const [UOM, setUOM] = useState("");
  // const [BalanceVolume, setBalanceVolume] = useState("");
  // const [RequireVolume, setRequireVolume] = useState("");
  const [CursorOnCross, setCursorOnCross] = useState(false);
  return (
    <CustomModal open={Open} setOpen={setOpen}>
      {/* Main Wrapper */}
      <div className="pb-5">
        {/* title */}
        <div className="flex font-[Quicksand] font-[700] text-[1.5rem] py-6 pl-7">
          {t("ReservationColumns.ReservationDetails")}
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
              label={t("ReservationColumns.orderNumber")}
              placeholder="50"
              required={false}
              Value={orderData.orderNumber}
              // setValue={setOrderNumber}
              readonly={true}
            />
            <AuthInput
              label={t("ReservationColumns.stationName")}
              placeholder="Station Name"
              required={false}
              Value={orderData.station?.name}
              // setValue={setStationName}
              readonly={true}
            />
            <AuthInput
              label={t("ReservationColumns.reservationDate")}
              placeholder="Reservation Date"
              required={false}
              Value={moment(new Date(orderData.createdAt * 1000)).format(
                "DD/MM/YYYY h:mm A"
              )}
              // setValue={setReservationDetails}
              readonly={true}
            />
            <AuthInput
              label={t("ReservationColumns.receiptNumber")}
              placeholder="not specified"
              required={false}
              Value={orderData.reciept_number}
              // setValue={setReceiptNumber}
              readonly={true}
            />
            <AuthInput
              label={t("ReservationColumns.paidAmount")}
              placeholder="Add Amount..."
              required={false}
              Value={orderData.station.paid_amount}
              // setValue={setPaidAmount}
              readonly={true}
            />
            <AuthInput
              label={t("ReservationColumns.arrivalDate")}
              placeholder="Add Expected Date..."
              required={false}
              Value={
                orderData?.station?.deliveryTime
                  ? moment(
                      new Date(orderData?.station?.deliveryTime * 1000)
                    ).format("DD/MM/YYYY h:mm A")
                  : // .toDateString()
                  orderData.arrival_data
                  ? moment(new Date(orderData.arrival_data * 1000)).format(
                      "DD/MM/YYYY h:mm A"
                    )
                  : // .toDateString()
                  orderData.expected_arrival
                  ? moment(new Date(orderData.expected_arrival * 1000)).format(
                      "DD/MM/YYYY h:mm A"
                    )
                  : // .toDateString()
                    "Not specified"
              }
              // setValue={setArrivalDate}
              readonly={true}
            />
            <AuthInput
              label={t("ReservationColumns.startPoints")}
              placeholder="Select Start Point..."
              required={false}
              Value={orderData.from.name || "not specified"}
              // setValue={setStartPoints}
              readonly={true}
            />
            <AuthInput
              label={t("ReservationColumns.addTip")}
              placeholder="None"
              required={false}
              Value={orderData.driverTip}
              // setValue={setAddTip}
              readonly={true}
            />
          </div>
          {/* Right Side */}
          <div className="flex flex-col">
            <AuthInput
              label={t("ReservationColumns.gasType")}
              placeholder="95"
              required={false}
              Value={fuelTypeFunc(orderData.fuel_type)}
              // setValue={setGasType}
              readonly={true}
            />
            <AuthInput
              label={t("ReservationColumns.uom")}
              placeholder="Liters"
              required={false}
              Value={"Liters"}
              // setValue={setUOM}
              readonly={true}
            />
            <AuthInput
              label={t("ReservationColumns.balanceVolume")}
              placeholder="not specified"
              required={false}
              Value={orderData.station.value}
              // setValue={setBalanceVolume}
              readonly={true}
            />
            <AuthInput
              label={t("ReservationColumns.requireVolume")}
              placeholder="not specified"
              required={false}
              Value={orderData.station.required_volume}
              // setValue={setRequireVolume}
              readonly={true}
            />
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ReservationDetails;
