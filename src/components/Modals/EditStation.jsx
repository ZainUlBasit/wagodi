import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import AuthInput from "../Input/AuthInput";
import AuthInputPopOver from "../Input/AuthInputPopOver";
import { Popover, Switch, Typography } from "@mui/material";
import AuthTextArea from "../Input/AuthTextArea";
import AuthInputPassword from "../Input/AuthInputPassword";
import { FaPlus } from "react-icons/fa";
import AddGasInputs from "../AddGas/AddGasInputs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import AddGasInputsPrefilled from "../AddGas/AddGasInputsPrefilled";
import { AddFuel, UpdateFuel, UpdateStationApi } from "../../Https";
import { data } from "autoprefixer";
import toast from "react-hot-toast";
import SuccessToast from "../Toast/SuccessToast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/Slices/UserSlice";
import { fetchStations } from "../../store/Slices/StationSlice";
import WarningToast from "../Toast/WarningToast";
import LocationSearchInput from "../../utility/LocationSearchInput";
import AddingLightLoader from "../Loaders/AddingLightLoader";

const EditStation = ({ Open, setOpen, CurrentStation }) => {
  const [StationNumber, setStationNumber] = useState(CurrentStation.phone);
  const [StationName, setStationName] = useState(CurrentStation.name);
  const [Address, setAddress] = useState(CurrentStation.address);
  const [Longitude, setLongitude] = useState("");
  const [Latitude, setLatitude] = useState("");
  const [EditIndex, setEditIndex] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Status, setStatus] = useState(CurrentStation.active);
  const dispatch = useDispatch();
  const Current_User = useSelector((state) => state.auth);

  const handleSelect = ({ address, latLng }) => {
    setAddress(address);
    setLongitude(latLng.lng);
    setLatitude(latLng.lat);
  };

  const onSubmitMethod = async (e) => {
    setLoading(true);
    e.preventDefault();
    const UpdateGases = AllGases.map((data) => {
      if (data.type === 0 || data.type === "91" || data.type === 91) {
        return {
          ...data,
          type: 0,
        };
      } else if (data.type === 1 || data.type === "95" || data.type === 95) {
        return {
          ...data,
          type: 1,
        };
      } else if (data.type === 2 || data.type === "D") {
        return {
          ...data,
          type: 2,
        };
      }
    });

    console.log(UpdateGases);
    const UpdationIds = await Promise.all(
      UpdateGases.map(async (data) => {
        if (data?._id) {
          const response = await UpdateFuel({
            stationId: CurrentStation._id,
            updateData: [
              {
                fuelId: data._id,
                updatedValue: data.value,
                updatePriceLitre: data.price_litre,
                updateType: data.type,
                updateMaxValue: data.max_value,
              },
            ],
          });
          return data._id;
        }
      })
    );
    const AddedIds = await Promise.all(
      UpdateGases.map(async (data) => {
        if (!data?._id) {
          const response = await AddFuel({
            payload: {
              price_litre: data.price_litre,
              max_value: data.max_value,
              value: data.value,
              type: data.type,
            },
          });
          console.log(response);
          return response?.data?.data?._id;
        }
      })
    );
    // previous state =false && current state = true then allowed station is equal to activeStation
    const BodyData = {
      stationId: CurrentStation._id,
      updateData: {
        name: StationName,
        address: Address,
        phone: StationNumber,
        fuels: UpdateGases,
        active: Status,
        longitude: Longitude,
        latitude: Latitude,
        fuels: [...UpdationIds, ...AddedIds].filter((id) => id !== undefined),
      },
    };

    // return;
    if (StationNumber === "") {
      WarningToast("Enter Valid Station Number");
    } else if (StationName === "") {
      WarningToast("Enter Valid Name");
    } else if (Address === "") {
      WarningToast("Enter Valid Address");
    } else if (BodyData.updateData.fuels.length === 0) {
      WarningToast("Please Provide atleast one Gas");
    } else {
      try {
        let response = await UpdateStationApi(BodyData);
        console.log(response);
        if (response.data.success) {
          SuccessToast("Station Successfully Updated...");
          dispatch(fetchStations(Current_User.data.companyId));
          setOpen(false);
        } else if (!response.data.success) {
          toast.error(response.data?.error?.msg);
        }
      } catch (err) {
        toast.error(err.response?.data?.error?.msg);
        console.log(err);
      }
    }
    setLoading(false);
  };

  const [AllGases, setAllGases] = useState(CurrentStation.populatedFuels);
  const [ShowAddGassInputs, setShowAddGassInputs] = useState(false);
  const [ShowAddGassInputsPrefilled, setShowAddGassInputsPrefilled] =
    useState(false);

  const deleteGas = (index) => {
    const updatedGases = [...AllGases];
    updatedGases.splice(index, 1);
    setAllGases(updatedGases);
  };

  useEffect(() => {
    console.log(AllGases);
  }, [AllGases]);

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
              <LocationSearchInput
                CurrentValue={Address}
                onSelect={handleSelect}
              />
              <div className="mb-3"></div>
              {/* <AuthTextArea
                label={"Address"}
                placeholder={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
                }
                required={false}
                Value={Address}
                setValue={setAddress}
              /> */}
              <div>
                <Switch
                  defaultChecked
                  checked={Status}
                  size="large"
                  onClick={() => setStatus(!Status)}
                />
                {Status ? "Active" : "Inactive"}
              </div>
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
              <div className="ml-10 max767:ml-0 flex max767:justify-center max767:items-center gap-x-2 my-3 font-[Quicksand] text-[13.9px]">
                <span className="font-[700] mr-1">Gas Type:</span>
                <div className="flex font-[Quicksand] font-[300] items-center">
                  <div className="w-[80px] max767:w-[35px] border-r-[1px] border-r-[#606060]">
                    {ag.type === 0 || Number(ag.type) === 91
                      ? "91"
                      : ag.type === 1 || Number(ag.type) === 95
                      ? "95"
                      : "D"}
                  </div>
                  <div className="w-[80px] max767:w-[80px] border-r-[1px] border-r-[#606060] text-center">
                    {ag.max_value}
                  </div>
                  <div className="w-[80px] max767:w-[70px] border-r-[1px] border-r-[#606060] text-center">
                    {ag.value}
                  </div>
                  <div className="w-[80px] max767:w-[45px] text-right">
                    {ag.price_litre}
                  </div>
                  <RiDeleteBin6Line
                    onClick={() => deleteGas(index)}
                    className="ml-4 text-[1.3rem] cursor-pointer hover:text-[red] transition-all duration-500"
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
          {Loading ? (
            <AddingLightLoader />
          ) : (
            <div className="w-full flex justify-center items-center gap-x-5 mb-5">
              <button
                className={`mt-[5px] mb-[30px] w-[197px] max767:w-[110px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                onClick={onSubmitMethod}
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
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default EditStation;
