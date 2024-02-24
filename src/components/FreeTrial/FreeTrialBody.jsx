import React, { useState } from "react";
import AuthInputPopOver from "../Input/AuthInputPopOver";

const FreeTrialBody = () => {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [BusinessName, setBusinessName] = useState("");
  const [CountryName, setCountryName] = useState("");
  const [Stations, setStations] = useState([]);

  return (
    <div className="w-fit font-[Quicksand] flex flex-col justify-center items-center shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] px-5 py-8 rounded-md sm:h-fit fade-in sm:w-[90%] max767:mb-4 RegisterWrapper">
      <h1 className="w-full text-[26px] font-[700] text-center RegisterWelcomeText">
        FREE TRIAL REQUEST
      </h1>
      <p className="mb-[20px] font-[300] RegisterDescText">
        Just Some Information and you are in
      </p>
      {/* main wrapper */}
      <div className="w-full flex gap-x-6 max1200:flex-col  max1200:items-center">
        {/* left side */}
        <div>
          <AuthInput
            label={"First Name"}
            placeholder={"Company 123"}
            Value={CompanyName}
            setValue={setCompanyName}
            required={false}
          />
          <AuthInput
            label={"Last Name"}
            placeholder={"123@gmail.com"}
            Value={Email}
            setValue={setEmail}
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
            Value={PhoneNumber}
            setValue={setPhoneNumber}
            required={false}
          />
          {/* Stations you want to manage */}
          <AuthInputPopOver
            label={"Stations you want to manage"}
            placeholder={"Select Stations..."}
            Value={Role}
            onClick={(data) => handleClickRole(data)}
          />
          <AuthInputPopOver
            label={"Company Name"}
            placeholder={"Select Country..."}
            Value={Role}
            onClick={(data) => handleClickRole(data)}
          />
        </div>
      </div>
      <AuthBtn title={"Sign Up"} onSubmit={onSubmit} />
    </div>
  );
};

export default FreeTrialBody;
