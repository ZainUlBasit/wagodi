import React, { useState } from "react";
import CustomModal from "./CustomModal";
import AuthInput from "../Input/AuthInput";
import AuthTextArea from "../Input/AuthTextArea";
import { CreateVendorApi } from "../../Https";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendors } from "../../store/Slices/VendorSlice";
import toast from "react-hot-toast";
import WarningToast from "../Toast/WarningToast";
import LocationSearchInput from "../../utility/LocationSearchInput";
import AddingLightLoader from "../Loaders/AddingLightLoader";

const AddVendor = ({ Open, setOpen }) => {
  const [VendorName, setVendorName] = useState("");
  const [Location, setLocation] = useState("");
  const [Longitude, setLongitude] = useState("");
  const [Latitude, setLatitude] = useState("");
  const [Loading, setLoading] = useState(false);
  const [_95, set_95] = useState("");
  const [_91, set_91] = useState("");
  const [_D, set_D] = useState("");

  const Auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let Fuel_Array = [
      _91 && {
        type: 0,
        price_litre: Number(_91),
      },
      _95 && {
        type: 1,
        price_litre: Number(_95),
      },
      _D && {
        type: 2,
        price_litre: Number(_D),
      },
    ];
    Fuel_Array = Fuel_Array.filter((fu) => fu !== "");
    if (Fuel_Array.length === 0) {
      WarningToast("Please provide atleast one Price Per/L");
    } else {
      try {
        const response = await CreateVendorApi({
          companyId: Auth.data.companyId._id,
          name: VendorName,
          address: Location,
          fuels: Fuel_Array,
          longitude: Longitude,
          latitude: Latitude,
        });
        console.log("", response);
        if (response.data?.success) {
          toast.success(response.data.data?.msg);
          dispatch(fetchVendors(Auth.data.companyId));
          setOpen(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(false);
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
          Add Vendor
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
              <LocationSearchInput onSelect={handleSelect} />
              <div className="mb-3"></div>
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
                    className="px-2 py-2 border border-gray-300 rounded-[7.94px] w-[100%] max767:w-[90px] outline-none"
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
                    className="px-2 py-2 border border-gray-300 rounded-[7.94px] w-[100%] max767:w-[90px] outline-none"
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
                    className="px-2 py-2 border border-gray-300 rounded-[7.94px] w-[100%] max767:w-[90px] outline-none"
                    value={_D}
                    onChange={(e) => set_D(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          {Loading ? (
            <div className="w-full flex justify-center items-center gap-x-5 mt-5 mb-7 font-[Quicksand]">
              <AddingLightLoader />
            </div>
          ) : (
            <div className="w-full flex justify-center items-center gap-x-5 mt-5 mb-3 font-[Quicksand]">
              <button
                className={`mt-[5px] mb-[30px] w-[197px] max767:w-[110px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                onClick={onSubmit}
              >
                Add
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

export default AddVendor;
