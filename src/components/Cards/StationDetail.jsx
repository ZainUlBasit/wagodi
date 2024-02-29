import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import StationReport from "../Modals/StationReport";
import toast from "react-hot-toast";
import { UpdateStationApi } from "../../Https";
import { useDispatch, useSelector } from "react-redux";
import { MakeFav, fetchStations } from "../../store/Slices/StationSlice";
import SuccessToast from "../Toast/SuccessToast";
import { useNavigate } from "react-router-dom";
import { FavouriteStation } from "../../store/Slices/UserSlice";

const StationDetail = ({
  StationDetailData,
  setOpen,
  Open,
  setCurrentStationName,
}) => {
  const [_91, set_91] = useState([]);
  const [_95, set_95] = useState([]);
  const [_D, set_D] = useState([]);
  const [Status, setStatus] = useState("");
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

  const navigate = useNavigate();
  const navigateToAddReservation = (type) => {
    navigate("/add-reservation", {
      state: {
        type,
        s_name: StationDetailData.name,
        s_id: StationDetailData._id,
        s_location: StationDetailData.address,
        s_long: StationDetailData.longitude,
        s_lat: StationDetailData.latitude,
        fuel_id: type === 0 ? _91._id : type === 1 ? _95._id : _D._id,
        max_value:
          type === 0
            ? _91.max_value
            : type === 1
            ? _95.max_value
            : _D.max_value,
        value: type === 0 ? _91.value : type === 1 ? _95.value : _D.value,
      },
    });
  };

  return (
    <div className="relative mx-5 my-3 w-[350px] maxWeb1:w-[440px] maxWeb2:w-[480px] maxWeb3:w-[530px] maxWeb4:w-[580px] rounded-[20px] h-auto pb-3 maxWeb1:h-[200px] maxWeb2:h-[250px] maxWeb3:h-[300px] maxWeb4:h-[300px] overflow-hidden">
      <div
        className={`${
          StationDetailData.current_status === "Healthy"
            ? "bg-[#2EB100]"
            : StationDetailData.current_status === "BeReady"
            ? "bg-[#6877DC]"
            : StationDetailData.current_status === "MakeOrder"
            ? "bg-[#C93D33]"
            : "bg-black"
        } text-white cursor-pointer h-full`}
        onClick={() => {
          setOpen(!Open);
          setCurrentStationName(StationDetailData.name);
        }}
      >
        {/* Header (Station Name*/}
        <div className="flex justify-between items-center w-full px-5 pl-[30px] pt-4">
          <div className="font-[Quicksand] font-[700] text-[1rem] maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem]">
            Station Name:{" "}
            <span className="font-[Quicksand] font-[400]">
              {StationDetailData.name}
            </span>
          </div>
        </div>
        {/* Middle (Last Order Detail) */}
        <div className="flex font-[Quicksand] font-[700] text-[1rem] gap-x-1 pl-[30px] pt-1 maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem]">
          Last Ordered:
          <span className="font-[Quicksand] font-[400]">
            {StationDetailData.active}
          </span>
        </div>
        {/* Footer (Detail) */}
        <div className="flex flex-col justify-center items-center py-5 pt-2 pl-4 w-[100%]">
          {_95.length !== 0 && (
            <div className="flex pl-4 items-center w-[100%] gap-x-4">
              <div className="font-[700] font-[Quicksand] text-[1rem] w-[5%] maxWeb1:w-[6%] maxWeb2:w-[7%] maxWeb3:w-[8%] maxWeb4:w-[8%] maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem]">
                95
              </div>
              <div className="font-[500] font-[Quicksand] text-[1rem] w-[95%] maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem]  maxWeb1:w-[94%] maxWeb2:w-[93%] maxWeb3:w-[92%] maxWeb4:w-[92%]">
                {_95.max_value}/ <span>{_95.value}</span>{" "}
                {Current_User.data.role === 2 && (
                  <span
                    className="clicking-button"
                    onClick={() => navigateToAddReservation(1)}
                  >
                    +
                  </span>
                )}
              </div>
            </div>
          )}
          {_91.length !== 0 && (
            <div className="flex pl-4 items-center w-[100%] gap-x-4">
              <div className="font-[700] font-[Quicksand] text-[1rem] w-[5%] maxWeb1:w-[6%] maxWeb2:w-[7%] maxWeb3:w-[8%] maxWeb4:w-[8%] maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem]">
                91
              </div>
              <div className="font-[500] font-[Quicksand] text-[1rem] w-[95%] maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem]  maxWeb1:w-[94%] maxWeb2:w-[93%] maxWeb3:w-[92%] maxWeb4:w-[92%]">
                {_91.max_value}/<span>{_91.value}</span>{" "}
                {Current_User.data.role === 2 && (
                  <span
                    className="clicking-button"
                    onClick={() => navigateToAddReservation(0)}
                  >
                    +
                  </span>
                )}
              </div>
            </div>
          )}
          {_D.length !== 0 && (
            <div className="flex pl-4 items-center w-[100%] gap-x-4">
              <div className="font-[700] font-[Quicksand] text-[1rem] w-[5%] maxWeb1:w-[6%] maxWeb2:w-[7%] maxWeb3:w-[8%] maxWeb4:w-[8%] maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem]">
                D
              </div>
              <div className="font-[500] font-[Quicksand] text-[1rem] w-[95%] maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem]  maxWeb1:w-[94%] maxWeb2:w-[93%] maxWeb3:w-[92%] maxWeb4:w-[92%]">
                {_D.max_value}/<span>{_D.value}</span>{" "}
                {Current_User.data.role === 2 && (
                  <span
                    className="clicking-button"
                    onClick={() => navigateToAddReservation(2)}
                  >
                    +
                  </span>
                )}
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
            dispatch(
              MakeFav({
                id: StationDetailData._id,
                status: !StationDetailData.favorite,
              })
            );
            const BodyData = {
              stationId: StationDetailData._id,
              updateData: {
                favorite: !StationDetailData.favorite,
              },
            };
            console.log(BodyData);
            let response = await UpdateStationApi(BodyData);
            if (response.data.success) {
              SuccessToast("Station favourite Successfully...");
              // dispatch(FavouriteStation(StationDetailData._id));
            } else if (!response.data.success) {
              console.log(response);
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
              });
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
        {(Status === "" ? StationDetailData.favorite : Status) ? (
          <AiFillStar className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem]" />
        ) : (
          <AiOutlineStar className="maxWeb1:text-[1.5rem] maxWeb2:text-[1.8rem] maxWeb3:text-[2rem] maxWeb4:text-[2.2rem]" />
        )}
      </div>
    </div>
  );
};

export default StationDetail;
