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
import { CreateStationApi, UpdateCompanyDuration } from "../../Https";
import toast from "react-hot-toast";
import { fetchStations } from "../../store/Slices/StationSlice";
import WarningToast from "../Toast/WarningToast";
import LocationSearchInput from "../../utility/LocationSearchInput";
import AddingLightLoader from "../Loaders/AddingLightLoader";
import MapContainer from "../../utility/MapContainer";
import QrCodesModal from "./QrCodes";
import ErrorToast from "../Toast/ErrorToast";
import moment from "moment";
import SuccessToast from "../Toast/SuccessToast";
import { fetchControlSubscibers } from "../../store/Slices/ControlSubscribersSlice";
// import { MapContainer } from "../../utility/LocationPicker";

const EditDuration = ({ Open, setOpen, CompanyId, CurrentDuration }) => {
  console.log(CompanyId);
  const dispatch = useDispatch();
  const [Duration, setDuration] = useState(
    moment(new Date(CurrentDuration * 1000)).format("YYYY-MM-DD")
  );
  const [Loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await UpdateCompanyDuration({
        companyId: CompanyId,
        duration: Math.floor(new Date(Duration) / 1000),
      });
      if (response.data.success) {
        SuccessToast(response.data.data.msg);
        dispatch(fetchControlSubscibers());

        setOpen(false);
      }
    } catch (err) {
      ErrorToast("Error Occured While Updating Duration of Company!");
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div>
        <h1 className="w-full text-center font-[700] text-3xl py-8 font-[Quicksand] mb-4">
          Edit Duration
        </h1>
        <div>
          <div className="flex gap-x-10 px-10 max767:flex-col">
            {/* left */}
            <div>
              <AuthInput
                Type={"date"}
                label="Duration"
                placeholder="2"
                required={false}
                Value={Duration}
                setValue={setDuration}
              />
            </div>
          </div>

          {Loading ? (
            <div className="w-full flex justify-center items-center gap-x-5 mb-5 font-[Quicksand]">
              <AddingLightLoader />
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center gap-y-3 mb-5 mt-5 font-[Quicksand]">
              <button
                className={`mt-[5px] w-[197px] max767:w-[100px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                onClick={onSubmit}
              >
                Update
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
    </CustomModal>
  );
};

export default EditDuration;
