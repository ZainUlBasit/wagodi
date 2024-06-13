import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import AuthInput from "../Input/AuthInput";
import AuthInputPopOver from "../Input/AuthInputPopOver";
import { Popover, Typography } from "@mui/material";
import AuthTextArea from "../Input/AuthTextArea";
import AuthInputPassword from "../Input/AuthInputPassword";
import { useDispatch, useSelector } from "react-redux";
import { fetchStations } from "../../store/Slices/StationSlice";
import { CreateStationManagerApi } from "../../Https";
import toast from "react-hot-toast";
import WarningToast from "../Toast/WarningToast";
import ErrorToast from "../Toast/ErrorToast";
import { fetchUsers } from "../../store/Slices/UserSlice";
import AddingLightLoader from "../Loaders/AddingLightLoader";
import LocationSearchInput from "../../utility/LocationSearchInput";
import { BsSearch } from "react-icons/bs";

const AddUser = ({ Open, setOpen }) => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Authority, setAuthority] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [Role, setRole] = useState("");
  const [StationNumber, setStationNumber] = useState("");
  const [StationName, setStationName] = useState("");
  const [Gender, setGender] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Long, setLong] = useState("");
  const [Lat, setLat] = useState("");
  const [SearchPopOver, setSearchPopOver] = useState("");

  const [anchorElRole, setAnchorElRole] = useState(null);
  const [anchorElStationName, setAnchorElStationName] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickRole = (event) => {
    setAnchorElRole(event.currentTarget);
  };
  const handleClickStationName = (event) => {
    setAnchorElStationName(event.currentTarget);
  };

  const handleCloseRole = () => {
    setAnchorElRole(null);
  };
  const handleCloseStationName = () => {
    setAnchorElStationName(null);
  };

  const RoleToEnum = (role) => {
    return role === "Administrator"
      ? 1
      : role === "Order Manager"
      ? 2
      : role === "Station Manager"
      ? 3
      : 4;
  };

  const onSubmit = async (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) return ErrorToast("Invalid email entered!");
    setLoading(true);
    e.preventDefault();
    let req_data = {
      name: Username,
      email: Email,
      companyId: Auth.data.companyId,
      password: Password,
      role: RoleToEnum(Role),
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
    // console.log(req_data);
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    if (Username === "") {
      WarningToast("Please Enter Username...");
    } else if (!emailRegex.test(Email) || Email === "") {
      ErrorToast(Email === "" ? "Please Enter Email..." : "Invalid Email...");
    } else if (Password === "") {
      WarningToast("Please enter password...");
    } else if (!phoneRegex.test(PhoneNumber) || PhoneNumber === "") {
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
        // create user
        const response = await CreateStationManagerApi(req_data);
        if (response.data?.success) {
          toast.success(
            `${
              Role === "Administrator"
                ? "Administrator"
                : Role === "Order Manager"
                ? "Order Manager"
                : Role === "Driver"
                ? "Driver"
                : Role === "Station Manager" && "Station Manager"
            } successfully added..!`
          );
          dispatch(
            fetchUsers({
              companyId: Auth.data.companyId,
              query: {
                companyId: Auth.data.companyId,
              },
            })
          );
          setOpen(false);
        } else if (!response.data?.success) {
          ErrorToast(response.data?.error?.msg);
        }
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const openRole = Boolean(anchorElRole);
  const idRole = openRole ? "role-popover" : undefined;
  const openStationName = Boolean(anchorElStationName);
  const idStationName = openStationName ? "station-name-popover" : undefined;

  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.auth);
  const StationsData = useSelector((state) => state.StationReducer);
  const handleSelect = ({ address, latLng }) => {
    setAddress(address);
    setLong(latLng.lat);
    setLat(latLng.lng);
  };
  useEffect(() => {
    dispatch(fetchStations(Auth.data.companyId));
  }, []);
  return (
    <CustomModal open={Open} setOpen={Loading ? "" : setOpen}>
      <div>
        <h1 className="w-full text-center font-[700] text-3xl py-8 font-[Quicksand]">
          Add User
        </h1>
        <div className="">
          <div className="flex gap-x-10 px-10 max767:flex-col">
            {/* left */}
            <div>
              <AuthInput
                label="User Name"
                placeholder="Enter username"
                required={false}
                Value={Username}
                setValue={(data) => setUsername(data)}
              />
              <AuthInput
                label="Email"
                placeholder="Enter email"
                required={false}
                Value={Email}
                setValue={(data) => setEmail(data)}
              />
              <AuthInputPassword
                label={"Password"}
                placeholder={"***************"}
                required={false}
                Value={Password}
                setValue={(data) => setPassword(data)}
              />

              <LocationSearchInput onSelect={handleSelect} />

              {/* <AuthTextArea
                label={"Address"}
                placeholder={"Enter address"}
                required={false}
                Value={Address}
                setValue={(data) => setAddress(data)}
              /> */}
            </div>
            {/* right */}
            <div>
              <AuthInput
                label="Phone Number"
                placeholder="Enter number"
                required={false}
                Value={PhoneNumber}
                setValue={(data) => setPhoneNumber(data)}
                Type={"number"}
              />
              <AuthInputPopOver
                label={"Role"}
                placeholder={"Select Role..."}
                Value={Role}
                onClick={(data) => handleClickRole(data)}
              />
              <div className="mb-4"></div>

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
              {Role === "Station Manager" && (
                <>
                  <AuthInputPopOver
                    label={"Authority and Privileges"}
                    placeholder={"Select Authority and Privileges"}
                    required={false}
                    Value={Authority}
                    onClick={handleClick}
                  />
                  <div className="mb-4"></div>
                  {/* Station Name */}
                  <AuthInputPopOver
                    label={"Station Name"}
                    placeholder={"Select station name"}
                    required={false}
                    Value={StationName}
                    onClick={handleClickStationName}
                  />
                </>
              )}

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
                          setAuthority("Orders");
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                          checked={Authority === "Orders"}
                        />
                        <span>Orders</span>
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
                      <div className="flex border-[1px] w-[260px] border-black items-center gap-x-2 px-3 py-[6px] rounded-full overflow-hidden bg-white">
                        <BsSearch className="text-black" />
                        <input
                          className="outline-none w-full text-black"
                          placeholder="Search Station name"
                          value={SearchPopOver}
                          onChange={(e) => setSearchPopOver(e.target.value)}
                        />
                      </div>
                      {StationsData.data
                        .filter((dt) => {
                          const lowerCaseSearch = SearchPopOver.toLowerCase();
                          const lowerCaseStation = dt.name.toLowerCase();
                          if (SearchPopOver !== "") {
                            return lowerCaseStation.includes(lowerCaseSearch);
                          } else {
                            return dt;
                          }
                        })
                        .map((sd) => {
                          console.log(sd);
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
            <div className="w-full flex justify-center items-center my-[18px]">
              <AddingLightLoader />
            </div>
          ) : (
            <div className="w-full flex justify-center items-center gap-x-5 font-[Quicksand] mt-4">
              <button
                className={`mt-[5px] mb-[30px] w-[197px] max767:w-[120px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
                onClick={onSubmit}
              >
                Add
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

export default AddUser;
