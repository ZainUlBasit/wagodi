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
import { ApprovedCompany, RejectCompany, UpdateStationApi } from "../../Https";
import { data } from "autoprefixer";
import toast from "react-hot-toast";
import SuccessToast from "../Toast/SuccessToast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/Slices/UserSlice";
import { fetchStations } from "../../store/Slices/StationSlice";
import WarningToast from "../Toast/WarningToast";
import LocationSearchInput from "../../utility/LocationSearchInput";
import ErrorToast from "../Toast/ErrorToast";
import { fetchAllCompany } from "../../store/Slices/AllCompanySlice";
import AddingLightLoader from "../Loaders/AddingLightLoader";

const SubcriptionAcceptOrReject = ({ Open, setOpen, State, ViewOnly }) => {
  console.log(State);
  const [CompanyName, setCompanyName] = useState(State?.name);
  const [Email, setEmail] = useState(State?.email);
  const [PhoneNumber, setPhoneNumber] = useState(State?.phone);
  const [CRN, setCRN] = useState(State?.crn_number);
  const [TaxNumber, setTaxNumber] = useState(State?.tax_number);
  const [Address, setAddress] = useState(State?.address);
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div>
        <h1 className="w-full text-center font-[700] text-3xl py-8 font-[Quicksand] mb-4">
          {ViewOnly ? "Company Details" : "Subscription Request"}
        </h1>
        <div>
          <div className="flex gap-x-10 px-10 max767:flex-col max767:items-center">
            {/* left */}
            <div className="flex flex-col gap-y-4">
              <AuthInput
                label="Compnay Name"
                placeholder="Company Name..."
                required={false}
                Value={CompanyName}
                setValue={setCompanyName}
                disabled={true}
              />
              <AuthInput
                label="Email"
                placeholder="123"
                required={false}
                Value={Email}
                setValue={setEmail}
                disabled={true}
              />
              <AuthInput
                label="Phone Number"
                placeholder="123"
                required={false}
                Value={PhoneNumber}
                setValue={setPhoneNumber}
                disabled={true}
              />
            </div>
            <div className="flex flex-col gap-y-4">
              <AuthInput
                label="Commercial Registration Number"
                placeholder="123"
                required={false}
                Value={CRN}
                setValue={setCRN}
                disabled={true}
              />
              <AuthInput
                label="Taxation Number"
                placeholder="Taxation Number..."
                required={false}
                Value={TaxNumber}
                setValue={setTaxNumber}
                disabled={true}
              />
              <AuthInput
                label="Address"
                placeholder="123"
                required={false}
                Value={Address}
                setValue={setAddress}
                disabled={true}
              />
            </div>
            {/* buttons */}
          </div>
          {Loading ? (
            <div className="w-full flex justify-center items-center gap-x-5 my-5">
              <AddingLightLoader />
            </div>
          ) : (
            !ViewOnly && (
              <div className="w-full flex justify-center items-center gap-x-5">
                <button
                  className={`mt-[5px] mb-[30px] w-[197px] max767:w-[110px] h-fit py-2 border-[1px] border-[green] bg-[green] hover:bg-[#008000c7] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const response = await ApprovedCompany({
                        companyId: State._id,
                      });
                      if (response.data.success) {
                        SuccessToast("Succeessfully Approved!");
                        dispatch(fetchAllCompany({ enterprise: true }));
                        setOpen(false);
                      } else ErrorToast("Unable to Approved Company");
                    } catch (err) {
                      console.log(err);
                    }
                    setLoading(false);
                  }}
                >
                  Accept
                </button>
                <button
                  className={`mt-[5px] mb-[30px] w-[197px] max767:w-[110px] border-[1px] border-[red] h-fit py-2 bg-[#fff] hover:bg-[red] rounded-[40px] text-[red] hover:text-[#fff] text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                  onClick={async () => {
                    const response = await RejectCompany({
                      companyId: State._id,
                    });
                    setOpen(false);
                  }}
                >
                  Reject
                </button>
              </div>
            )
          )}
          <div className="my-5"></div>
        </div>
      </div>
    </CustomModal>
  );
};

export default SubcriptionAcceptOrReject;
