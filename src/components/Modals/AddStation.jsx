import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import AuthInput from "../Input/AuthInput";
import AuthInputPopOver from "../Input/AuthInputPopOver";
import { Popover, Typography } from "@mui/material";
import AuthTextArea from "../Input/AuthTextArea";
import AuthInputPassword from "../Input/AuthInputPassword";
import { FaPlus } from "react-icons/fa";
import AddGasInputs from "../AddGas/AddGasInputs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { CreateStationApi } from "../../Https";
import toast from "react-hot-toast";
import { fetchStations } from "../../store/Slices/StationSlice";
import WarningToast from "../Toast/WarningToast";
import LocationSearchInput from "../../utility/LocationSearchInput";
import AddingLightLoader from "../Loaders/AddingLightLoader";
import MapContainer from "../../utility/MapContainer";
import QrCodesModal from "./QrCodes";
import ShowMessageModal from "./ShowMessageModal";
// import { MapContainer } from "../../utility/LocationPicker";

const AddStation = ({ Open, setOpen }) => {
  const [StationNumber, setStationNumber] = useState("");
  const [StationName, setStationName] = useState("");
  const [Address, setAddress] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Longitude, setLongitude] = useState("");
  const [Latitude, setLatitude] = useState("");
  const Auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [OpenQrCodesModal, setOpenQrCodesModal] = useState(false);
  const [SelFuelType, setSelFuelType] = useState("");
  const [AllGases, setAllGases] = useState([]);
  const [ShowAddGassInputs, setShowAddGassInputs] = useState(false);
  const StationsData = useSelector((state) => state.StationReducer);
  const [StationExceed, setStationExceed] = useState(false);
  const [StationExceedMsg, setStationExceedMsg] = useState("");

  useEffect(() => {
    console.log(AllGases);
  }, [AllGases]);

  const deleteGas = (index) => {
    const updatedGases = [...AllGases];
    updatedGases.splice(index, 1);
    setAllGases(updatedGases);
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const BodyData = {
      companyId: Auth.data.companyId,
      fuels: AllGases.map((ag) => {
        return {
          type:
            ag.type === "91" ? 0 : ag.type === "95" ? 1 : ag.type === "D" && 2,
          price_litre: Number(ag.price_litre),
          value: Number(ag.value),
          max_value: Number(ag.max_value),
          dispensers: ag.dispensers,
          // dispenserCount: ag.dispenserCount ? ag.dispenserCount : [],
        };
      }),
      name: StationName,
      address: Address,
      phone: StationNumber,
      longitude: Longitude,
      latitude: Latitude,
    };

    console.log(BodyData);
    console.log(AllGases);
    // setLoading(false);

    // return;

    if (StationNumber === "") {
      WarningToast("Enter Valid Station Number");
    } else if (StationName === "") {
      WarningToast("Enter Valid Name");
    } else if (Address === "") {
      WarningToast("Enter Valid Address");
    } else if (BodyData.fuels.length === 0) {
      WarningToast("Please Provide atleast one Gas");
    } else {
      try {
        const response = await CreateStationApi(BodyData);
        if (response.data.success) {
          setOpen(false);
          toast.success(response.data.data?.msg);
          dispatch(fetchStations(Auth.data.companyId));
        } else {
          if (
            "The company has reached the maximum number of allowed stations!" ===
            response.data.error?.msg
          ) {
            setStationExceed(true);
            setStationExceedMsg(response.data.error?.msg);
          } else toast.error(response.data.error?.msg);
        }
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(false);
  };

  const handleSelect = ({ address, latLng }) => {
    setAddress(address);
    setLongitude(latLng.lng);
    setLatitude(latLng.lat);
  };

  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div>
        <h1 className="w-full text-center font-[700] text-3xl py-8 font-[Quicksand] mb-4">
          Add Station
        </h1>
        <div>
          <div className="flex gap-x-10 px-10 max767:flex-col">
            {/* left */}
            <div>
              <AuthInput
                Type={"number"}
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
              <div className="mb-4">
                <MapContainer
                  SearchLat={Latitude}
                  SearchLan={Longitude}
                  setLongitude={setLongitude}
                  setLatitude={setLatitude}
                  setAddress={setAddress}
                  apiKey={"AIzaSyCn3iFUNjO37dPrLUYkJLxW_Iqxcuojq_A"}
                />
              </div>
            </div>
          </div>
          {/* Show data of array of Gasses */}
          {AllGases.map((ag, index) => {
            return (
              <div className="ml-10 max767:ml-0 flex max767:justify-center max767:items-center gap-x-2 my-3 font-[Quicksand] text-[13.9px]">
                <span className="font-[700] mr-1">Gas Type:</span>
                <div className="flex font-[Quicksand] font-[300] items-center">
                  <div className="w-[80px] max767:w-[35px] border-r-[1px] border-r-[#606060]">
                    {ag.type}
                  </div>
                  <div className="w-[80px] max767:w-[80px] border-r-[1px] border-r-[#606060] text-center">
                    {ag.max_value}
                  </div>
                  <div className="w-[80px] max767:w-[70px] border-r-[1px] border-r-[#606060] text-center">
                    {Number(ag.value).toFixed(2)}
                  </div>
                  <div className="w-[80px] max767:w-[70px] border-r-[1px] border-r-[#606060] text-center">
                    {Number(ag.price_litre).toFixed(2)}
                  </div>
                  <div className="w-[80px] max767:w-[45px] text-right">
                    {/* <div className="w-[80px] max767:w-[70px] border-r-[1px] border-r-[#606060] text-center"> */}
                    {ag.dispensers ? ag.dispensers.length : 0}
                  </div>
                  <RiDeleteBin6Line
                    onClick={() => deleteGas(index)}
                    className="mx-4 text-[1.3rem] cursor-pointer hover:text-[red] transition-all duration-500"
                  />
                  <button
                    className={`w-fit h-fit py-1 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1rem] font-[700] transition-all duration-500 ease-in-out px-2`}
                    onClick={() => {
                      setOpenQrCodesModal(true);
                      setSelFuelType(ag.type);
                    }}
                  >
                    Qr Codes
                  </button>
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
          {Loading ? (
            <div className="w-full flex justify-center items-center gap-x-5 mb-5 font-[Quicksand]">
              <AddingLightLoader />
            </div>
          ) : (
            <div className="w-full flex justify-center items-center gap-x-5 mb-5 font-[Quicksand]">
              <button
                className={`mt-[5px] mb-[30px] w-[197px] max767:w-[100px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                onClick={onSubmit}
              >
                Add
              </button>
              <button
                className={`mt-[5px] mb-[30px] w-[197px] max767:w-[100px] border-[1px] border-[#90898E] h-fit py-2 bg-[#fff] hover:bg-[#465462] rounded-[40px] text-[#90898E] hover:text-[#fff] text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      {OpenQrCodesModal && (
        <QrCodesModal
          open={OpenQrCodesModal}
          setOpen={setOpenQrCodesModal}
          StationNo={StationNumber}
          FuelType={SelFuelType}
          CurrentDispenser={
            AllGases.find((ft) => ft.type === SelFuelType).dispensers || ""
          }
        />
      )}
      {StationExceed && (
        <ShowMessageModal
          Open={StationExceed}
          setOpen={setStationExceed}
          msg={StationExceedMsg}
        />
      )}
    </CustomModal>
  );
};

export default AddStation;
