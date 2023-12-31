import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import StationReport from "../Modals/StationReport";
import toast from "react-hot-toast";
import { UpdateStationApi } from "../../Https";
import { useDispatch, useSelector } from "react-redux";
import { fetchStations } from "../../store/Slices/StationSlice";
import SuccessToast from "../Toast/SuccessToast";

const StationDetail = ({
  StationDetailData,
  setOpen,
  Open,
  setCurrentStationName,
}) => {
  const [_91, set_91] = useState([]);
  const [_95, set_95] = useState([]);
  const [_D, set_D] = useState([]);
  const dispatch = useDispatch();
  const Current_User = useSelector((state) => state.auth);
  const setFuelsData = () => {
    StationDetailData?.populatedFuels.map((f_data) => {
      if (f_data.type === 0) {
        set_91(f_data);
      }
      if (f_data.type === 1) {
        set_95(f_data);
      }
      if (f_data.type === 2) {
        set_D(f_data);
      }
    });
  };
  useEffect(() => {
    setFuelsData();
  }, []);

  return (
    <div className="relative mx-5 my-3 w-[350px] rounded-[16px] h-[165px] overflow-hidden">
      <div
        className={`${
          StationDetailData.current_status === "Healthy"
            ? "bg-[#2EB100]"
            : StationDetailData.current_status === "BeReady"
            ? "bg-[#6877DC]"
            : StationDetailData.current_status === "MakeOrder"
            ? "bg-[#C93D33]"
            : ""
        } text-white cursor-pointer h-full`}
        onClick={() => {
          setOpen(!Open);
          setCurrentStationName(StationDetailData.name);
        }}
      >
        {/* Header (Station Name*/}
        <div className="flex justify-between items-center w-full px-4 pr-5 pt-4">
          <div className="font-[Quicksand] font-[700] text-[1rem]">
            Station Name:{" "}
            <span className="font-[Quicksand] font-[400]">
              {StationDetailData.name}
            </span>
          </div>
        </div>
        {/* Middle (Last Order Detail) */}
        <div className="flex font-[Quicksand] font-[700] text-[1rem] gap-x-1 px-4 pt-1">
          Last Ordered:
          <span className="font-[Quicksand] font-[400]">
            {StationDetailData.active}
          </span>
        </div>
        {/* Footer (Detail) */}
        <div className="flex flex-col justify-center items-center py-5 pt-2 w-[100%]">
          {_95.length !== 0 && (
            <div className="flex pl-4 items-center w-[100%] gap-x-4">
              <div className="font-[700] font-[Quicksand] text-[1rem] w-[5%]">
                95
              </div>
              <div className="font-[500] font-[Quicksand] text-[1rem] w-[95%]">
                {_95.max_value}/ <span>{_95.value}</span>
              </div>
            </div>
          )}
          {_91.length !== 0 && (
            <div className="flex pl-4 items-center w-[100%] gap-x-4">
              <div className="font-[700] font-[Quicksand] text-[1rem] w-[5%]">
                91
              </div>
              <div className="font-[500] font-[Quicksand] text-[1rem] w-[95%]">
                {_91.max_value}/<span>{_91.value}</span>
              </div>
            </div>
          )}
          {_D.length !== 0 && (
            <div className="flex pl-4 items-center w-[100%] gap-x-4">
              <div className="font-[700] font-[Quicksand] text-[1rem] w-[5%]">
                D
              </div>
              <div className="font-[500] font-[Quicksand] text-[1rem] w-[90%]">
                {_D.max_value}/<span>{_D.value}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="absolute top-4 right-4 cursor-pointer text-white"
        onClick={async (e) => {
          e.preventDefault();
          try {
            let response = await UpdateStationApi({
              stationId: StationDetailData._id,
              updateData: {
                favorite: !StationDetailData.favorite,
              },
            });
            console.log(response);
            if (response.data.success) {
              SuccessToast("Station Successfully Updated...");
              dispatch(fetchStations(Current_User.data.companyId));
            } else if (!response.data.success) {
              toast.error(response.data?.error?.msg, {
                duration: 4000,
                position: "top-right",
                style: {
                  border: "1px solid red",
                  padding: "16px",
                  color: "red",
                  backgroundColor: "white",
                  fontFamily: "Quicksand",
                },
                iconTheme: {
                  primary: "red",
                  secondary: "white",
                },
              })
              dispatch(fetchStations(Current_User.data.companyId));
            }
          } catch (err) {
            toast.error(err.response?.data?.error?.msg || err.response?.data, {
              duration: 4000,
              position: "top-right",
              style: {
                border: "1px solid red",
                padding: "16px",
                color: "red",
                backgroundColor: "white",
                fontFamily: "Quicksand",
              },
              iconTheme: {
                primary: "red",
                secondary: "white",
              },
            });
            console.log(err);
          }
        }}
      >
        {StationDetailData.favorite ? <AiFillStar /> : <AiOutlineStar />}
      </div>
    </div>
  );
};

export default StationDetail;
