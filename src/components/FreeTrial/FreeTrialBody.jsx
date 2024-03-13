import React, { useState } from "react";
import AuthInputPopOver from "../Input/AuthInputPopOver";
import AuthInput from "../Input/AuthInput";
import AuthBtn from "../buttons/AuthBtn";
import { Checkbox, FormControlLabel, Popover, Typography } from "@mui/material";
import { ContryCodeData } from "../../assets/ContryCodeData";

const FreeTrialBody = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [BusinessName, setBusinessName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Stations, setStations] = useState([]);
  const [CountryName, setCountryName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="w-fit font-[Quicksand] flex flex-col justify-center items-center shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] px-5 py-8 rounded-md sm:h-fit fade-in sm:w-[90%] max767:mb-4 RegisterWrapper">
      <h1 className="w-full text-[26px] font-[700] text-center RegisterWelcomeText">
        FREE TRIAL REQUEST
      </h1>
      <p className="mb-[20px] font-[300] RegisterDescText">
        Just Some Information and you are in
      </p>
      {/* main wrapper */}
      <div className="w-full flex justify-center gap-x-6 max1200:flex-col  max1200:items-center">
        {/* left side */}
        <div>
          <AuthInput
            label={"First Name"}
            placeholder={"Company 123"}
            Value={FirstName}
            setValue={setFirstName}
            required={false}
          />
          <AuthInput
            label={"Last Name"}
            placeholder={"123@gmail.com"}
            Value={LastName}
            setValue={setLastName}
            required={false}
          />
          <AuthInput
            label={"Phone Number"}
            placeholder={"1234567890"}
            Value={PhoneNumber}
            setValue={setPhoneNumber}
            required={false}
          />
        </div>
        {/* Right side */}
        <div>
          <AuthInput
            label={"Business Name"}
            placeholder={"1234567890"}
            Value={BusinessName}
            setValue={setBusinessName}
            required={false}
          />
          {/* Stations you want to manage */}
          <AuthInput
            label={"Stations you want to manage"}
            placeholder={"No. of stations"}
            Value={Stations}
            setValue={setStations}
            required={false}
          />
          <AuthInputPopOver
            label={"Country Name"}
            placeholder={"Select Country..."}
            Value={CountryName}
            onClick={(data) => handleClick(data)}
          />

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            PaperProps={{
              sx: {
                borderRadius: "25px",
                backgroundColor: "white",
                width: "300px",
                overflow: "hidden",
                maxHeight: "400px", // Set the maximum height for scrolling
                overflowY: "auto", // Make it scrollable
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
                  {ContryCodeData.map((data) => (
                    <div
                      className={`flex gap-x-3 font-[Quicksand] items-center cursor-pointer w-[250px] ${
                        CountryName === data.name ? "font-extrabold" : ""
                      }`}
                      onClick={() => {
                        handleClose();
                        setCountryName(data.name);
                      }}
                    >
                      <span>{data.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Typography>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col w-[90%] gap-y-3 py-3">
        <div className="flex gap-x-2">
          <input
            type="checkbox"
            name="TermsAndConditions"
            id="TermsAndConditions"
          />

          <div>
            By checking this box, I confirm that I have read, understood and
            agree to the{" "}
            <span className="text-[#3F46FA] underline">Terms and Conditions</span>
          </div>
        </div>
        <div className="flex gap-x-2">
          <input
            type="checkbox"
            name="TermsAndConditions"
            id="TermsAndConditions"
          />
          By checking this box, you agree with storage and handling
        </div>
      </div>
      <AuthBtn title={"Sign Up"} onSubmit={() => {}} />
    </div>
  );
};

export default FreeTrialBody;
