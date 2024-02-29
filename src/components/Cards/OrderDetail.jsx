import React, { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import StationReport from "../Modals/StationReport";
import { useNavigate } from "react-router-dom";
import { SetSelectedOrder } from "../../store/Slices/SelectedOrder";
import { useDispatch } from "react-redux";

const OrderDetail = ({ Order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="relative p-3 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] rounded-[16px] overflow-hidden border border-[#465462] mx-8 my-3 h-auto w-[330px]">
      <div className={`w-full cursor-pointer px-4`} onClick={() => {}}>
        {/* Header (Station Name*/}
        <div className="flex justify-between items-center w-full px-4 pr-5 pb-[2px]">
          <div className="font-[Quicksand] font-[700] text-[1rem]">
            Driver Name:{" "}
            <span className="font-[Quicksand] font-[400]">
              {Order.driverId?.name || "not assigned"}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center w-full px-4 pr-5 pb-[2px]">
          <div className="font-[Quicksand] font-[700] text-[1rem]">
            Station Name:{" "}
            <span className="font-[Quicksand] font-[400]">
              {Order.station.id.name || "not specified"}
            </span>
          </div>
        </div>
        {/* Middle (Last Order Detail) */}
        <div className="flex font-[Quicksand] font-[700] text-[1rem] gap-x-1 px-4 pb-[2px]">
          Paid Amount:{" "}
          <span className="font-[Quicksand] font-[400]">
            {Order.fuel_price}
          </span>
        </div>
        {/* line */}
        <div className="flex justify-center">
          <div className="flex font-[Quicksand] font-[700] text-[1rem]  px-4 bg-[#465462] h-[2px] w-[90%]"></div>
        </div>
        {/* Footer (Detail) */}
        <div className="flex flex-col justify-center items-center py-5 pt-[6px] w-[100%] pb-1">
          <div className="font-[Quicksand] font-[700] text-[1rem]">
            Receipt number:{" "}
            <span className="font-[300]">{Order.reciept_number}</span>
          </div>
        </div>
      </div>
      <div
        className="absolute top-4 right-3 cursor-pointer text-[#465462] text-[1.8rem]"
        onClick={() => {
          dispatch(SetSelectedOrder(Order))
          navigate("/orders-report-info");
        }}
      >
        <BiChevronRight />
      </div>
    </div>
  );
};

export default OrderDetail;
