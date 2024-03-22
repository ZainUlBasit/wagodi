import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import AuthInput from "../Input/AuthInput";
// import AuthInputPopOver from "../Input/AuthInputPopOver";
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
import AuthInputPopOver from "../Input/AuthInputPopOver";

const AddStationsReservation = ({ Open, setOpen, formik }) => {
  const [StationNumber, setStationNumber] = useState("");
  const [StationName, setStationName] = useState("");
  const [Address, setAddress] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Longitude, setLongitude] = useState("");
  const [Latitude, setLatitude] = useState("");
  const Auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [AllGases, setAllGases] = useState([]);
  const [ShowAddGassInputs, setShowAddGassInputs] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const StationsData = useSelector((state) => state.StationReducer);

  useEffect(() => {
    dispatch(fetchStations(Auth.data.companyId));
  }, []);

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
    const CheckStation = formik.values.stations.filter(
      (st) => st._id === CurrentStation._id
    );
    if (CheckStation.length) {
      const UpdateStations = formik.values.stations.map((st) => {
        if (st._id === CurrentStation._id) {
          return {
            ...st,
            required_volume:
              Number(st.required_volume) + Number(RequiredVolume),
          };
        } else {
          return st;
        }
      });
      formik.setFieldValue("stations", [...UpdateStations]);
      setOpen(false);
    } else if (CurrentStation && RequiredVolume) {
      formik.setFieldValue("stations", [
        ...formik.values.stations,
        {
          fuel_id: CurrentStation.populatedFuels.find(
            (fd) => fd.type === formik.values.fuel_type
          )._id,
          current_value: CurrentStation.populatedFuels.find(
            (fd) => fd.type === formik.values.fuel_type
          ).value,
          current_price: CurrentStation.populatedFuels.find(
            (fd) => fd.type === formik.values.fuel_type
          ).price_litre,
          required_volume: RequiredVolume,
          ...CurrentStation,
        },
      ]);
      setOpen(false);
    } else {
      WarningToast("Required Fields are undefined!");
    }
    setLoading(false);
  };

  const handleSelect = ({ address, latLng }) => {
    setAddress(address);
    setLongitude(latLng.lng);
    setLatitude(latLng.lat);
  };

  const [CurrentStation, setCurrentStation] = useState({});
  const [RequiredVolume, setRequiredVolume] = useState("");
  const [FuelId, setFuelId] = useState("");

  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div className="flex flex-col items-center justify-center p-10 gap-y-6">
        <AuthInputPopOver
          label={"Select Station"}
          placeholder={"Select Station..."}
          Value={
            !CurrentStation.name ? "Select Station..." : CurrentStation.name
          }
          onClick={(data) => handleClick(data)}
        />
        <div className="relative w-[297px] font-[Quicksand]">
          <label
            htmlFor={"volume"}
            className="absolute top-[-11px] left-3 w-fit bg-white h-[13px] text-[15px] font-bold font-[Quicksand]"
          >
            Required Volume
          </label>
          <input
            type="number"
            required={true}
            name="volume"
            placeholder={"Required Volume..."}
            className="px-3 py-2 border border-gray-300 rounded-[7.94px] w-full outline-none font-[Quicksand]"
            value={RequiredVolume}
            onChange={(e) => setRequiredVolume(e.target.value)}
          />
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderRadius: "25px", // Add rounded corners
              backgroundColor: "white", // Set background color to white
              width: "300px", // Set the width as needed
              overflow: "hidden", // Hide overflowing content
              //   marginTop: "6px",
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Typography
            sx={{
              p: 2,
              borderColor: "#465462",
              backgroundColor: "#465462",
              width: "400px",
              overflow: "hidden",
              borderRadius: "25px",
            }}
          >
            <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
              <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                {/* start data here */}
                {StationsData?.data
                  .filter((dt) => {
                    //   dt.active;
                    const checkFuel = dt.populatedFuels.find(
                      (fd) => fd.type === formik.values.fuel_type
                      // formik.setFieldValue(
                      //   `stations.[${formik.values.stations.length}.stationId]fuel_id`,
                      //   fd._id
                      // );
                      //   setFuelId(fd._id);
                      //   return fd;
                      // }
                      //   }
                    );
                    if (dt.active && checkFuel) return dt;
                  })
                  .map((data) => {
                    return (
                      <div
                        className="flex gap-x-3 items-center cursor-pointer"
                        onClick={() => {
                          handleClose();

                          setCurrentStation(data);
                          //   formik.setFieldValue(
                          //     `stations.[${formik.values.stations.length}.stationId]`,
                          //     data._id
                          //   );
                          //   formik.setFieldValue(
                          //     `stations.[${formik.values.stations.length}.from_address]`,
                          //     data.address
                          //   );
                          //   formik.setFieldValue(
                          //     `stations.[${formik.values.stations.length}.from_name]`,
                          //     data.name
                          //   );
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                          checked={CurrentStation._id === data._id}
                        />
                        <span>{data.name}</span>
                      </div>
                    );
                  })}

                {/* end data here */}
              </div>
            </div>
          </Typography>
        </Popover>
        {Loading ? (
          <div className="w-full flex justify-center items-center gap-x-5 font-[Quicksand]">
            <AddingLightLoader />
          </div>
        ) : (
          <div className="w-full flex justify-center items-center gap-x-5 font-[Quicksand]">
            <button
              className={`mt-[5px] w-[197px] max767:w-[100px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
              onClick={onSubmit}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default AddStationsReservation;
