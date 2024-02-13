import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import AuthInput from "../Input/AuthInput";
import AuthTextArea from "../Input/AuthTextArea";
import { UpdateVendorApi } from "../../Https";
import SuccessToast from "../Toast/SuccessToast";
import { fetchVendors } from "../../store/Slices/VendorSlice";
import { useDispatch } from "react-redux";
import ErrorToast from "../Toast/ErrorToast";
import WarningToast from "../Toast/WarningToast";
import LocationSearchInput from "../../utility/LocationSearchInput";

const EditVendor = ({ Open, setOpen, Data, companyId }) => {
  const [VendorName, setVendorName] = useState(Data.name);
  const [Location, setLocation] = useState(Data.address);
  const [_95, set_95] = useState(Data.fuels[1]?.price_litre);
  const [_91, set_91] = useState(Data.fuels[0]?.price_litre);
  const [_D, set_D] = useState(Data.fuels[2]?.price_litre);
  const [Longitude, setLongitude] = useState("");
  const [Latitude, setLatitude] = useState("");
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    console.log(_91);
    console.log(_95);
    console.log(_D);
    e.preventDefault();
    const Fuel_Array = Data.fuels.map((fu, i) => {
      if (_91 !== "" && i === 0) {
        return {
          _id: fu._id,
          type: 0,
          price_litre: Number(_91),
        };
      } else if (_95 !== "" && i === 1) {
        return {
          _id: fu._id,
          type: 1,
          price_litre: Number(_95),
        };
      } else if (_D !== "" && i === 2) {
        return {
          _id: fu._id,
          type: 2,
          price_litre: Number(_D),
        };
      }
    });
    if (Fuel_Array.length === 0) {
      return WarningToast("Please Enter Any One Price Per/L");
    }
    const BodyData = {
      id: Data._id,
      payload: { name: VendorName, address: Location },
      fuels: Fuel_Array,
      longitude: Longitude,
      latitude: Latitude,
    };
    try {
      const response = await UpdateVendorApi(BodyData);
      console.log(response);
      if (response.data?.success) {
        SuccessToast("Successfully updated!");
        dispatch(fetchVendors(companyId));
        setOpen(false);
        return;
      }
      ErrorToast("Error updating!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelect = ({ address, latLng }) => {
    setLocation(address);
    setLongitude(latLng.lng);
    setLatitude(latLng.lat);
  };

  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div>
        <h1 className="w-full text-center font-[700] text-3xl py-8 font-[Quicksand]">
          Edit Vendor
        </h1>
        <div className="">
          <div className="flex gap-x-10 px-10 max767:flex-col">
            {/* left */}
            <div>
              <AuthInput
                label="Vendor Name"
                placeholder="Vendor X"
                required={false}
                Value={VendorName}
                setValue={setVendorName}
              />
              <LocationSearchInput
                CurrentValue={Data.address}
                onSelect={handleSelect}
              />
              <div className="mb-3"></div>
              {/* <AuthTextArea
                label={"Location"}
                placeholder={"Write Address"}
                required={false}
                Value={Location}
                setValue={setLocation}
              /> */}
            </div>
            {/* right */}
            <div className="flex flex-col">
              <div className="font-[Quicksand] font-[700] mt-[-10px] text-[1rem] mb-3">
                Price per/L
              </div>
              <div className="flex gap-x-2">
                <div className="relative mb-[15px] w-[110px] max767:w-[90px]">
                  <p className="absolute top-[-11px] left-4 w-fit bg-white font-[Quicksand] text-[15px] font-[600]">
                    95
                  </p>
                  <input
                    type="number"
                    id="outlined-required"
                    placeholder={"10,000"}
                    className="px-2 py-2 border border-gray-300 rounded-[7.94px] w-[100%] outline-none"
                    value={_95}
                    onChange={(e) => set_95(e.target.value)}
                  />
                </div>

                <div className="relative mb-[15px] w-[110px] max767:w-[90px]">
                  <p className="absolute top-[-11px] left-4 w-fit bg-white font-[Quicksand] text-[15px] font-[600]">
                    91
                  </p>
                  <input
                    type="number"
                    id="outlined-required"
                    placeholder={"10,000"}
                    className="px-2 py-2 border border-gray-300 rounded-[7.94px] w-[100%] outline-none"
                    value={_91}
                    onChange={(e) => set_91(e.target.value)}
                  />
                </div>
                <div className="relative mb-[15px] w-[110px] max767:w-[90px]">
                  <p className="absolute top-[-11px] left-4 w-fit bg-white font-[Quicksand] text-[15px] font-[600]">
                    D
                  </p>
                  <input
                    type="number"
                    id="outlined-required"
                    placeholder={"10,000"}
                    className="px-2 py-2 border border-gray-300 rounded-[7.94px] w-[100%] outline-none"
                    value={_D}
                    onChange={(e) => set_D(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-x-5 mt-5 mb-3 font-[Quicksand]">
            <button
              className={`mt-[5px] mb-[30px] w-[197px] max767:w-[110px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
              onClick={onSubmit}
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
        </div>
      </div>
    </CustomModal>
  );
};

export default EditVendor;
