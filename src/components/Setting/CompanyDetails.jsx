import React, { useState } from "react";
import AuthInput from "../Input/AuthInput";
import { FaRegEdit } from "react-icons/fa";
import AuthTextArea from "../Input/AuthTextArea";
import { FaPlus } from "react-icons/fa";
import MobNavbar from "../Navbar/MobNavbar";

const CompanyDetails = () => {
  const [CompanyName, setCompanyName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [CommercialRegistrationNumber, setCommercialRegistrationNumber] =
    useState("");
  const [TaxationNumber, setTaxationNumber] = useState("");
  const [Address, setAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  return (
    <>
      {/* Main Wrapper */}
      <div className="fade-in max767:mt-4 max767:flex max767:flex-col max767:justify-center max767:items-center">
        <div className="flex justify-between items-center mb-8 font-[600] font-[Quicksand] text-[1.8rem] px-5 max767:w-[90%] max767:px-0">
          <div>Details</div>
          <div>
            <FaRegEdit />
          </div>
        </div>
        <div className="flex gap-x-5 px-5 max767:flex-col max767:items-center max767:px-0">
          {/* Left Side */}
          <div>
            <AuthInput
              label={"Company Name"}
              placeholder={"Company 123"}
              required={false}
              Value={CompanyName}
              setValue={setCompanyName}
            />
            <AuthInput
              label={"Email"}
              placeholder={"123@gmail.com"}
              required={false}
              Value={Email}
              setValue={setEmail}
            />
            <AuthInput
              label={"Phone Number"}
              placeholder={"1234567890"}
              required={false}
              Value={PhoneNumber}
              setValue={setPhoneNumber}
            />
            <AuthInput
              label={"Commercial Registration Number"}
              placeholder={"1234"}
              required={false}
              Value={CommercialRegistrationNumber}
              setValue={setCommercialRegistrationNumber}
            />
            <AuthInput
              label={"Taxation Number"}
              placeholder={"1234"}
              required={false}
              Value={TaxationNumber}
              setValue={setTaxationNumber}
            />
          </div>
          {/* Right Side */}
          <div>
            <AuthTextArea
              label={"Address"}
              placeholder={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
              }
              required={false}
              Value={Address}
              setValue={setAddress}
            />
            <div className="flex flex-col">
              <label
                htmlFor="file-input"
                className="cursor-pointer flex items-center w-fit border-[1px] border-[#DCDCDC] py-[5px] px-[20px] pl-[10px] rounded-[7.94px] text-[13.9px]"
              >
                <FaPlus className="text-[#465462] text-[1.1rem] font-bold mr-5 ml-2" />
                Edit Company Logo
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
        <div className="max767:w-[90%] max767:flex  max767:justify-center ">
          <button
            className={`mt-[20px] w-[297px] h-fit py-2 ml-5 max767:ml-0 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
            onClick={() => {}}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
