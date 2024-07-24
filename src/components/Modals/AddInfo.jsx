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
import { validateEmail } from "../../utility/ValidateEmail";
// import { MapContainer } from "../../utility/LocationPicker";

const AddInfoModal = ({ Open, setOpen }) => {
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

    if (StationNumber.length !== 10) {
      WarningToast("Enter Valid Mobile Number");
    } else if (!validateEmail(StationName)) {
      WarningToast("Enter Valid Email!");
    } else if (Address === "") {
      WarningToast("Description is required!");
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
      <div className="flex flex-col">
        <h1 className="w-full text-center font-[700] text-3xl py-8 font-[Quicksand] mb-4 flex flex-col">
          Info
        </h1>
        <div className="flex gap-x-10 px-6 flex-col items-center">
          {/* left */}
          <AuthInput
            Type={"text"}
            label="Mobile Number"
            placeholder="1234567890"
            required={false}
            Value={StationNumber}
            setValue={setStationNumber}
          />
          <AuthInput
            type={"email"}
            label="Email"
            placeholder="abc@gmail.com"
            required={false}
            Value={StationName}
            setValue={setStationName}
          />
          <AuthTextArea
            type={"text"}
            label="Description"
            placeholder="Enter Description"
            required={false}
            Value={Address}
            setValue={setAddress}
          />
          {/* right */}
          {Loading ? (
            <div className="w-full flex justify-center items-center gap-x-5 mb-5 font-[Quicksand]">
              <AddingLightLoader />
            </div>
          ) : (
            <div className="w-full flex justify-center items-center gap-y-5 py-5 mb-5 font-[Quicksand] flex-col">
              <button
                className={`w-[197px] max767:w-[100px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                onClick={onSubmit}
              >
                Add
              </button>
              <button
                className={`w-[197px] max767:w-[100px] border-[1px] border-[#90898E] h-fit py-2 bg-[#fff] hover:bg-[#465462] rounded-[40px] text-[#90898E] hover:text-[#fff] text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
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

export default AddInfoModal;
