import React, { useState } from "react";
import AuthInput from "../Input/AuthInput";
import AuthTextArea from "../Input/AuthTextArea";
import AuthInputPassword from "../Input/AuthInputPassword";
import { FaPlus } from "react-icons/fa";
import AuthBtn from "../buttons/AuthBtn";
import "../../assets/Style/style.css";
import { SignUpApi } from "../../Https";
import toast from "react-hot-toast";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import AddingLoader from "../Loaders/AddingLoader";
import LocationSearchInput from "../../utility/LocationSearchInput";
import SuccessToast from "../Toast/SuccessToast";
import ErrorToast from "../Toast/ErrorToast";
import { validateEmail } from "../../utility/ValidateEmail";

const Register = () => {
  const [Email, setEmail] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [CommercialRegistration, setCommercialRegistration] = useState("");
  const [TaxationNumber, setTaxationNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Longitude, setLongitude] = useState("");
  const [Latitude, setLatitude] = useState("");
  const [NoOfStations, setNoOfStations] = useState(""); // New state for number of stations
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let response;
    const BodyData = {
      name: CompanyName,
      address: Address,
      phone: PhoneNumber,
      email: Email.toLowerCase(),
      crn_number: Number(CommercialRegistration),
      tax_number: TaxationNumber,
      password: Password,
      role: 0,
      no_station: Number(NoOfStations), // Include no_of_stations in the request body
    };

    if (
      !CompanyName ||
      !Address ||
      !PhoneNumber ||
      !Email ||
      !CommercialRegistration ||
      !TaxationNumber ||
      !Password ||
      !NoOfStations
    ) {
      ErrorToast("Required fields are undefined!");
      setLoading(false);
      return;
    }
    if (PhoneNumber.length !== 10) {
      ErrorToast("Invalid Mobile #!");
      setLoading(false);

      return;
    }
    if (!validateEmail(Email.toLowerCase())) {
      ErrorToast("Invalid email #!");
      setLoading(false);
      return;
    }

    try {
      response = await SignUpApi(BodyData);
      if (response.data.success) {
        SuccessToast(response.data.data.msg);
        // Reset all state variables upon successful signup
        setEmail("");
        setCompanyName("");
        setPhoneNumber("");
        setCommercialRegistration("");
        setTaxationNumber("");
        setAddress("");
        setPassword("");
        setConfirmPassword("");
        setSelectedFile(null);
        setLoading(false);
        setLongitude("");
        setLatitude("");
        setNoOfStations(""); // Reset no_of_stations state
        navigate("/auth");
      } else {
        toast.error(response.data.error.msg);
      }
    } catch (err) {
      console.log(err);
      if (
        `E11000 duplicate key error collection: test.companies index: name_1 dup key: { name: "Test" }` ===
        err?.response?.data?.error
      ) {
        ErrorToast("Mobile Number Already Registered!");
      } else {
        ErrorToast(err?.response?.data?.error?.msg);
      }
    }
    setLoading(false);
  };

  const handleSelect = ({ address, latLng }) => {
    setAddress(address);
    setLongitude(latLng.lng);
    setLatitude(latLng.lat);
  };

  return (
    <>
      <div className="w-fit font-[Quicksand] flex flex-col justify-center items-center shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] px-5 py-8 rounded-md sm:h-fit fade-in sm:w-[90%] max767:mb-4 RegisterWrapper">
        <h1 className="w-full text-[26px] font-[700] text-center RegisterWelcomeText">
          REGISTER
        </h1>
        <p className="mb-[20px] font-[300] RegisterDescText">
          Just Some Information and you are in
        </p>
        {/* main wrapper */}
        <div className="w-full flex gap-x-6 max1200:flex-col  max1200:items-center">
          {/* left side */}
          <div>
            <AuthInput
              label={"Company Name"}
              placeholder={"Company 123"}
              Value={CompanyName}
              setValue={setCompanyName}
              required={false}
            />
            <AuthInput
              label={"E-mail"}
              placeholder={"123@gmail.com"}
              Value={Email}
              setValue={setEmail}
              required={false}
            />
            <LocationSearchInput onSelect={handleSelect} />
            <div className="mb-4"></div>
            <AuthInput
              label={"Phone Number"}
              placeholder={"1234567890"}
              Value={PhoneNumber}
              setValue={setPhoneNumber}
              required={false}
            />
            <AuthInput
              label={"Commercial Registration Number"}
              placeholder={"1234"}
              Value={CommercialRegistration}
              setValue={setCommercialRegistration}
              required={false}
            />
          </div>
          {/* Right side */}
          <div>
            <AuthInput
              label={"Taxation Number"}
              placeholder={"1234"}
              Value={TaxationNumber}
              setValue={setTaxationNumber}
              required={false}
            />
            <AuthInputPassword
              label={"Password"}
              placeholder={"*************"}
              Value={Password}
              setValue={setPassword}
              required={false}
            />
            <AuthInputPassword
              label={"Confirm Password"}
              placeholder={"*************"}
              Value={ConfirmPassword}
              setValue={setConfirmPassword}
              required={false}
            />
            <AuthInput
              label={"Number of Stations"}
              placeholder={"5"}
              Value={NoOfStations}
              setValue={setNoOfStations}
              Type={"number"}
              required={false}
            />
            <div className="flex flex-col">
              <label
                htmlFor="file-input"
                className="cursor-pointer flex items-center w-fit border-[1px] border-[#DCDCDC] py-[5px] px-[20px] pl-[10px] rounded-[7.94px] text-[13.9px]"
              >
                <FaPlus className="text-[#465462] text-[1.1rem] font-bold mr-5 ml-2" />
                Add Company Logo
              </label>
              <input
                id="file-input"
                type="file"
                accept=".jpg, .jpeg, .png"
                className="hidden"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <div className="ml-3">
                  <p>Selected File: {selectedFile.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {Loading ? (
          <AddingLoader />
        ) : (
          <AuthBtn title={"Sign Up"} onSubmit={onSubmit} />
        )}
      </div>
    </>
  );
};

export default Register;
