import React, { useState } from "react";
import OrderManagerNavbar from "../Navbar/OrderManagerNavbar";
import AuthInput from "../Input/AuthInput";
import { BiDownload } from "react-icons/bi";
import { useSelector } from "react-redux";
import { convertFuel } from "../../utility/utilityFunctions";
import moment from "moment";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OrderInfo = () => {
  const [t, i18n] = useTranslation("global");
  const order = useSelector((state) => state.selectedOrder?.data);
  const navigate = useNavigate();
  console.log(order);
  const ReqDateTime = order.createdAt
    ? moment(new Date(order.createdAt * 1000)).format("DD/MM/YYYY h:mm a")
    : "not specified";
  const GasType = convertFuel(order.fuel_type);
  const UOM = "Liters";
  const BalanceVolume = order.station.value || "not specified";
  const RequiredVolume = order.station.required_volume || "not specified";
  const IssuedVolume = order.issued_volume || "not specified";
  const RecievedVolume = order.received_volume || "not specified";
  const OrderNumber = order.orderNumber || "not specified";
  const DeliveredDateTime = order.station.deliveryTime
    ? moment(new Date(order.station.deliveryTime * 1000)).format(
        "DD/MM/YYYY h:mm A"
      )
    : "not specified";

  return (
    <>
      {/* <OrderManagerNavbar /> */}
      <div className="w-full flex flex-col items-center justify-center fade-in">
        {/* Header */}
        <div className="w-[90%] max-w-[1200px] flex flex-col justify-between mt-6">
          <div className="font-[Quicksand] font-[600] text-[2rem] flex justify-center items-center gap-x-3 select-none">
            <FaArrowLeft
              className="text-[1.6rem] cursor-pointer"
              onClick={() => {
                navigate("/order-manager-orders-report");
              }}
            />
            {t("orderReportsColumns.ReceiptNo")}:{" "}
            <span className="font-[400] select-text">
              {order.reciept_number}
            </span>
          </div>
        </div>
        <div className="w-auto flex  flex-col justify-center items-center mt-10 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] rounded-[20px] p-10">
          <div className="w-auto flex flex-wrap gap-x-5 justify-center">
            {/* left side */}
            <div className="flex flex-col gap-y-3">
              <AuthInput
                label={t("orderReportsColumns.RequiredDateTime")}
                placeholder="21-Sep-23    11:30PM"
                required={false}
                Value={ReqDateTime}
                readonly={true}
              />
              <AuthInput
                label={t("orderReportsColumns.GasType")}
                placeholder="95"
                required={false}
                Value={GasType}
                readonly={true}
              />
              <AuthInput
                label={t("orderReportsColumns.UOM")}
                placeholder="Liters"
                required={false}
                Value={UOM}
                readonly={true}
              />
              <AuthInput
                label={t("orderReportsColumns.OrderNumber")}
                placeholder="Order Number"
                required={false}
                Value={OrderNumber}
                readonly={true}
              />
              <AuthInput
                label={t("orderReportsColumns.BalanceVolume")}
                placeholder="20,000"
                required={false}
                Value={BalanceVolume}
                readonly={true}
              />
            </div>
            {/* right side */}
            <div className="flex flex-col gap-y-3">
              <AuthInput
                label={t("orderReportsColumns.RequiredVolume")}
                placeholder="36,000"
                required={false}
                Value={RequiredVolume}
                readonly={true}
              />
              <AuthInput
                label={t("orderReportsColumns.IssuedVolume")}
                placeholder="36,000"
                required={false}
                Value={IssuedVolume}
                readonly={true}
              />
              <AuthInput
                label={t("orderReportsColumns.ReceivedVolume")}
                placeholder="36,000"
                required={false}
                readonly={true}
                Value={RecievedVolume}
              />
              <AuthInput
                label={t("orderReportsColumns.DeliveredDateTime")}
                placeholder="19-Sep-2023      10:43 PM"
                required={false}
                readonly={true}
                Value={DeliveredDateTime}
              />
            </div>
          </div>
          <div className="w-auto flex flex-wrap gap-x-3 gap-y-2 justify-center items-center">
            {order?.attachments.map((attachment) => (
              <a
                href={attachment.url}
                download={`${attachment.name}.png`}
                className="text flex items-center w-fit gap-x-2 border-[2px] border-[#96ADC5] hover:bg-[#96ADC5] hover:text-white px-2 py-2 text-[#465462] font-bold rounded-[10px] transition-all duration-500 ease-in-out"
              >
                <BiDownload className="text-[1.5rem]" /> {attachment.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInfo;
