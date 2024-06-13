import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import AuthInput from "../Input/AuthInput";
import AuthInputPopOver from "../Input/AuthInputPopOver";
import { Popover, Typography } from "@mui/material";
import AuthTextArea from "../Input/AuthTextArea";
import AuthInputPassword from "../Input/AuthInputPassword";
import { useDispatch, useSelector } from "react-redux";
import { fetchStations } from "../../store/Slices/StationSlice";
import LocationSearchInput from "../../utility/LocationSearchInput";
import { UpdateUserApi } from "../../Https";
import ErrorToast from "../Toast/ErrorToast";
import WarningToast from "../Toast/WarningToast";
import SuccessToast from "../Toast/SuccessToast";
import { fetchUsers } from "../../store/Slices/UserSlice";
import AddingLightLoader from "../Loaders/AddingLightLoader";

const EditUser = ({ Open, setOpen, CurrentUser }) => {
  const Auth = useSelector((state) => state.auth);
  const StationsData = useSelector((state) => state.StationReducer);
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Authority, setAuthority] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState(
    CurrentUser.phone_number.toString().length > 10
      ? CurrentUser.phone_number.toString().slice(0, 10)
      : CurrentUser.phone_number
  );
  const [Password, setPassword] = useState("");
  const [Role, setRole] = useState("");
  const [StationName, setStationName] = useState(
    StationsData?.data.filter((dt) => dt._id === CurrentUser?.stationId)[0]
      ?.name || ""
  );
  const [StationNumber, setStationNumber] = useState("");
  const [Long, setLong] = useState("");
  const [Lat, setLat] = useState("");
  const [Loading, setLoading] = useState(false);

  console.log(CurrentUser);

  const [Gender, setGender] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(CurrentUser.name);
    setEmail(CurrentUser.email);
    setAddress(CurrentUser?.address || "");
    setGender(CurrentUser?.gender || "");
    setStationNumber(CurrentUser.stationId);
    // setPassword(Current)
    setRole(
      CurrentUser.role === 1
        ? "Administrator"
        : CurrentUser.role === 2
        ? "Order Manager"
        : CurrentUser.role === 3
        ? "Station Manager"
        : CurrentUser.role === 4
        ? "Driver"
        : ""
    );
    if (CurrentUser.role === 3) {
      setAuthority(CurrentUser.privilage === 0 ? "Sales" : "Order");
      setPhoneNumber(CurrentUser.PhoneNumber);
      // setStationNumber(CurrentUser.stationId)
    }
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElRole, setAnchorElRole] = useState(null);
  const [anchorElStationName, setAnchorElStationName] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickRole = (event) => {
    setAnchorElRole(event.currentTarget);
  };
  const handleClickStationName = (event) => {
    setAnchorElStationName(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseRole = () => {
    setAnchorElRole(null);
  };
  const handleCloseStationName = () => {
    setAnchorElStationName(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(Email)) return ErrorToast("Invalid email entered!");
    setLoading(true);
    let req_data = {
      name: Username,
      email: Email,
      companyId: Auth.data.companyId,
      // password: Password,
      role:
        Role === "Administrator"
          ? 1
          : Role === "Order Manager"
          ? 2
          : Role === "Station Manager"
          ? 3
          : 4,
      phone_number: PhoneNumber,
      address: Address,
    };
    req_data =
      Role === "Administrator" || Role === "Order Manager" || Role === "Driver"
        ? {
            ...req_data,
          }
        : {
            ...req_data,
            privilage: Authority === "Sales" ? 0 : 1,
            stationId: StationNumber,
          };
    // const phoneRegex = /^\d{11}$/;
    const phoneNumberString = String(
      PhoneNumber === "" || PhoneNumber === undefined
        ? CurrentUser.phone_number
        : PhoneNumber
    );
    if (Username === "") {
      WarningToast("Please Enter Username...");
    } else if (!emailRegex.test(Email) || Email === "") {
      ErrorToast(Email === "" ? "Please Enter Email..." : "Invalid Email...");
    }
    // else if (Password === "") {
    //   WarningToast("Please enter password...");
    // }
    else if (phoneNumberString.length !== 10) {
      ErrorToast(
        PhoneNumber === ""
          ? "Please Enter valid phone number..."
          : "Invalid Phone Number..."
      );
    } else if (Role === "") {
      WarningToast("Please select role...");
    } else if (Authority === "" && Role === "Station Manager") {
      WarningToast("Please Select Authority and Privileges...");
    } else if (StationNumber === "" && Role === "Station Manager") {
      WarningToast("Please Select Station...");
    } else {
      try {
        const response = await UpdateUserApi({
          userId: CurrentUser._id,
          payload: req_data,
        });
        if (response?.data?.success) {
          SuccessToast("User Successfully Updated!");
          setOpen(false);
          dispatch(
            fetchUsers({
              companyId: Auth.data.companyId,
              query: {
                companyId: Auth.data.companyId,
              },
            })
          );
        } else {
          ErrorToast("Unable to Update User!");
        }
      } catch (err) {
        ErrorToast("Error Occured While Updating User. Please Try Again!");
        console.log(err);
      }
    }
    setLoading(false);
  };

  const handleSelect = ({ address, latLng }) => {
    setAddress(address);
    setLong(latLng.lat);
    setLat(latLng.lng);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const openRole = Boolean(anchorElRole);
  const idRole = openRole ? "role-popover" : undefined;
  const openStationName = Boolean(anchorElStationName);
  const idStationName = openStationName ? "station-name-popover" : undefined;
  return (
    <CustomModal open={Open} setOpen={setOpen}>
      <div>
        <h1 className="w-full text-center font-[700] text-3xl py-8 font-[Quicksand]">
          Edit User
        </h1>
        <div className="">
          <div className="flex gap-x-10 px-10 max767:flex-col">
            {/* left */}
            <div>
              <AuthInput
                label="User Name"
                placeholder="123"
                required={false}
                Value={Username}
                setValue={setUsername}
              />
              <AuthInput
                label="Email"
                placeholder="123@Gmail.com"
                required={false}
                Value={Email}
                setValue={setEmail}
              />
              <AuthInput
                label="Phone Number"
                placeholder="1234567890"
                required={false}
                Value={
                  PhoneNumber === "" || PhoneNumber === undefined
                    ? CurrentUser.phone_number
                    : PhoneNumber
                }
                setValue={setPhoneNumber}
              />
              {/* Authority Popover */}
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
                      <div
                        className="flex gap-x-3 items-center cursor-pointer"
                        onClick={() => {
                          handleClose();
                          setAuthority("Sales");
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                          checked={Authority === "Sales"}
                        />
                        <span>Sales</span>
                      </div>
                      <div
                        className="flex gap-x-3 items-center cursor-pointer"
                        onClick={() => {
                          handleClose();
                          setAuthority("Order");
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                          checked={Authority === "Order"}
                        />
                        <span>Order</span>
                      </div>
                    </div>
                  </div>
                </Typography>
              </Popover>
              <AuthInputPassword
                label={"Password"}
                placeholder={"***************"}
                required={false}
                Value={Password}
                setValue={setPassword}
              />
            </div>
            {/* right */}
            <div>
              <LocationSearchInput
                onSelect={handleSelect}
                CurrentValue={CurrentUser.address}
              />
              <div className="mb-4"></div>

              <AuthInputPopOver
                label={"Role"}
                placeholder={"Select role..."}
                required={false}
                Value={Role}
                onClick={handleClickRole}
              />
              <div className="mb-4"></div>

              {Role === "Station Manager" && (
                <>
                  <AuthInputPopOver
                    label={"Authority and Privlages"}
                    placeholder={"Select authority..."}
                    required={false}
                    Value={Authority}
                    onClick={handleClick}
                  />
                  <div className="mb-4"></div>
                  {/* Station Name */}
                  <AuthInputPopOver
                    label={"Station Name"}
                    placeholder={"Select station..."}
                    required={false}
                    Value={StationName}
                    onClick={handleClickStationName}
                  />
                </>
              )}
              {/* Role Popover */}
              <Popover
                id={idRole}
                open={openRole}
                anchorEl={anchorElRole}
                onClose={handleCloseRole}
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
                      <div
                        className="flex gap-x-3 items-center cursor-pointer"
                        onClick={() => {
                          handleCloseRole();
                          setRole("Administrator");
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                          checked={Role === "Administrator"}
                        />
                        <span>Administrator</span>
                      </div>
                      <div
                        className="flex gap-x-3 items-center cursor-pointer"
                        onClick={() => {
                          handleCloseRole();
                          setRole("Order Manager");
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                          checked={Role === "Order Manager"}
                        />
                        <span>Order Manager</span>
                      </div>
                      <div
                        className="flex gap-x-3 items-center cursor-pointer"
                        onClick={() => {
                          handleCloseRole();
                          setRole("Driver");
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                          checked={Role === "Driver"}
                        />
                        <span>Driver</span>
                      </div>
                      <div
                        className="flex gap-x-3 items-center cursor-pointer"
                        onClick={() => {
                          handleCloseRole();
                          setRole("Station Manager");
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                          checked={Role === "Station Manager"}
                        />
                        <span>Station Manager</span>
                      </div>
                    </div>
                  </div>
                </Typography>
              </Popover>

              {/* Station Name Popover */}
              <Popover
                id={idStationName}
                open={openStationName}
                anchorEl={anchorElStationName}
                onClose={handleCloseStationName}
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
                      {StationsData.data.map((sd) => {
                        return (
                          <div
                            className="flex gap-x-3 items-center cursor-pointer"
                            onClick={() => {
                              handleCloseStationName();
                              setStationNumber(sd._id);
                              setStationName(sd.name);
                            }}
                          >
                            <input
                              type="checkbox"
                              className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                              checked={StationNumber === sd._id}
                            />
                            <span>{sd.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Typography>
              </Popover>
            </div>
          </div>
          {Loading ? (
            <div className="w-full flex justify-center items-center gap-x-5 font-[Quicksand]">
              <AddingLightLoader />
            </div>
          ) : (
            <div className="w-full flex justify-center items-center gap-x-5 font-[Quicksand]">
              <button
                className={`mt-[5px] mb-[30px] w-[197px] max767:w-[120px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                onClick={onSubmit}
              >
                Edit
              </button>
              <button
                className={`mt-[5px] mb-[30px] w-[197px] max767:w-[120px] border-[1px] border-[#90898E] h-fit py-2 bg-[#fff] hover:bg-[#465462] rounded-[40px] text-[#90898E] hover:text-[#fff] text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
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

export default EditUser;
