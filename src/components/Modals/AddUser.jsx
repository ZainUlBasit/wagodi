import React, { useState } from "react";
import CustomModal from "./CustomModal";
import AuthInput from "../Input/AuthInput";
import AuthInputPopOver from "../Input/AuthInputPopOver";
import { Popover, Typography } from "@mui/material";
import AuthTextArea from "../Input/AuthTextArea";
import AuthInputPassword from "../Input/AuthInputPassword";

const AddUser = ({ Open, setOpen }) => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Authority, setAuthority] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [Role, setRole] = useState("");
  const [StationName, setStationName] = useState("");
  const [Gender, setGender] = useState("");

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
    console.log(Username);
    console.log(Email);
    console.log(Authority);
    console.log(Address);
    console.log(PhoneNumber);
    console.log(Password);
    console.log(Role);
    console.log(StationName);
    console.log(Gender);
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
          Add User
        </h1>
        <div className="">
          <div className="flex gap-x-10 px-10">
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
              <AuthInputPassword
                label={"Password"}
                placeholder={"***************"}
                required={false}
                Value={Password}
                setValue={setPassword}
              />

              <AuthTextArea
                label={"Address"}
                placeholder={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
                }
                required={false}
                Value={Address}
                setValue={setAddress}
              />
            </div>
            {/* right */}
            <div>
              <AuthInput
                label="Phone Number"
                placeholder="1234567890"
                required={false}
                Value={PhoneNumber}
                setValue={setPhoneNumber}
              />
              <AuthInput
                label="Gender"
                placeholder="Male"
                required={false}
                Value={Gender}
                setValue={setGender}
              />

              <AuthInputPopOver
                label={"Role"}
                placeholder={"Station Manager"}
                required={false}
                Value={Role}
                onClick={handleClickRole}
              />
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
                          checked={Authority === "Administrator"}
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
                          checked={Authority === "Order Manager"}
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
                          checked={Authority === "Driver"}
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
                          checked={Authority === "Station Manager"}
                        />
                        <span>Station Manager</span>
                      </div>
                    </div>
                  </div>
                </Typography>
              </Popover>
              {Role === "Station Manager" && (
                <AuthInputPopOver
                  label={"Authority and Privileges"}
                  placeholder={"Lorem ipsum"}
                  required={false}
                  Value={Authority}
                  onClick={handleClick}
                />
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
              {/* Station Name */}
              <AuthInputPopOver
                label={"Station Name"}
                placeholder={"Station Name"}
                required={false}
                Value={StationName}
                onClick={handleClickStationName}
              />
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
                      <div
                        className="flex gap-x-3 items-center cursor-pointer"
                        onClick={() => {
                          handleCloseStationName();
                          setStationName("MCJD-1016");
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                          checked={Authority === "MCJD-1016"}
                        />
                        <span>MCJD-1016</span>
                      </div>
                      <div
                        className="flex gap-x-3 items-center cursor-pointer"
                        onClick={() => {
                          handleCloseStationName();
                          setStationName("MCJD-1016");
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                          checked={Authority === "MCJD-1016"}
                        />
                        <span>MCJD-1016</span>
                      </div>
                      <div
                        className="flex gap-x-3 items-center cursor-pointer"
                        onClick={() => {
                          handleCloseStationName();
                          setStationName("MCJD-1015");
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                          checked={Authority === "MCJD-1015"}
                        />
                        <span>MCJD-1015</span>
                      </div>
                      <div
                        className="flex gap-x-3 items-center cursor-pointer"
                        onClick={() => {
                          handleCloseStationName();
                          setStationName("MCJD-1016");
                        }}
                      >
                        <input
                          type="checkbox"
                          className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                          checked={Authority === "MCJD-1016"}
                        />
                        <span>MCJD-1016</span>
                      </div>
                    </div>
                  </div>
                </Typography>
              </Popover>
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-x-5">
            <button
              className={`mt-[5px] mb-[30px] w-[197px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
              onClick={onSubmit}
            >
              Add
            </button>
            <button
              className={`mt-[5px] mb-[30px] w-[197px] border-[1px] border-[#90898E] h-fit py-2 bg-[#fff] hover:bg-[#465462] rounded-[40px] text-[#90898E] hover:text-[#fff] text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
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

export default AddUser;
