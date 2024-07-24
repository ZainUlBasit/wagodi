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
// import { MapContainer } from "../../utility/LocationPicker";

const ShowMessageModal = ({ Open, setOpen, msg }) => {
  const [Test, setTest] = useState(false);
  return (
    <CustomModal open={Open} setOpen={setTest}>
      <div className="px-5 p-4 flex flex-col gap-y-5 items-center max-w-[400px]">
        <div className="text-red-600 text-xl font-bold">
          Station Limit Exceeded!
        </div>
        <div className="text-center">{msg}</div>
        <button
          onClick={() => setOpen(false)}
          className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-all ease-in-out duration-500"
        >
          OK!
        </button>
      </div>
    </CustomModal>
  );
};

export default ShowMessageModal;
