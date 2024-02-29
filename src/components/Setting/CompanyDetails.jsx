import React, { useState } from "react";
import AuthInput from "../Input/AuthInput";
import { FaRegEdit } from "react-icons/fa";
import AuthTextArea from "../Input/AuthTextArea";
import { FaPlus } from "react-icons/fa";
import MobNavbar from "../Navbar/MobNavbar";
import { useSelector } from "react-redux";
import { api } from "../../Https";
import ErrorToast from "../Toast/ErrorToast";
import AddGasInputs from "../AddGas/AddGasInputs";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddGasTypeInputs from "../AddGas/AddGasTypeInputs";

const CompanyDetails = () => {
  const Auth = useSelector((state) => state.auth);
  const companyId = Auth?.data?.companyId._id;
  const [CompanyName, setCompanyName] = useState(Auth.data.name);
  const [Email, setEmail] = useState(Auth.data.email);
  const [PhoneNumber, setPhoneNumber] = useState(Auth.data.companyId.phone);
  const [CommercialRegistrationNumber, setCommercialRegistrationNumber] =
    useState(Auth.data.companyId.crn_number);
  const [TaxationNumber, setTaxationNumber] = useState(
    Auth.data.companyId.tax_number
  );
  const [Address, setAddress] = useState(Auth.data.companyId.address);
  const [selectedFile, setSelectedFile] = useState(null);

  const [AllGases, setAllGases] = useState([]);
  const [ShowAddGassInputs, setShowAddGassInputs] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const deleteGas = (index) => {
    const updatedGases = [...AllGases];
    updatedGases.splice(index, 1);
    setAllGases(updatedGases);
  };

  const handleSave = async () => {
    {
      const formData = new FormData();
      formData.append("companyId", companyId);
      const payload = {
        name: CompanyName,
        email: Email,
        crn_number: CommercialRegistrationNumber,
        tax_number: TaxationNumber,
        address: Address,
        phone: PhoneNumber,
      };
      formData.append("payload", payload);
      selectedFile ? formData.append("image", selectedFile) : "";
      console.log(formData);
      try {
        const response = await api.patch("/company/update", {
          companyId: companyId,
          payload: {
            name: CompanyName,
            email: Email,
            crn_number: CommercialRegistrationNumber,
            tax_number: TaxationNumber,
            address: Address,
            phone: PhoneNumber,
            image: selectedFile ? selectedFile : "",
          },
        });
        console.log(response.data.data.company);
      } catch (error) {
        console.log(error);
        ErrorToast("Error occured while updating!");
      }
    }
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
            <div className="flex flex-col mb-6">
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
            {AllGases.length !== 0 && (
              <div className="max767:ml-0 flex max767:justify-center max767:items-center gap-x-2 my-3 font-[Quicksand] text-[13.9px]">
                <span className="font-[700] mr-1">Gas Type:</span>
                <div className="flex flex-col gap-y-2 font-[Quicksand] font-[300] w-auto">
                  {AllGases.map((gas, index) => {
                    return (
                      <div className="flex border-l-2 border-l-black w-full justify-between">
                        <div
                          className={`px-5 max767:w-[35px]`}
                        >
                          {gas}
                        </div>
                        <RiDeleteBin6Line
                          onClick={() => {
                            deleteGas(index)
                          }}
                          className="ml-4 text-[1.3rem] cursor-pointer hover:text-[red] transition-all duration-500"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {ShowAddGassInputs && (
              <AddGasTypeInputs
                setAllGases={setAllGases}
                AllGases={AllGases}
                setShowAddGassInputs={setShowAddGassInputs}
              />
            )}
            <div className="flex flex-col">
              <label
                htmlFor="file-input1"
                className="cursor-pointer flex items-center w-fit border-[1px] border-[#DCDCDC] py-[5px] px-[20px] pl-[10px] rounded-[7.94px] text-[13.9px]"
                onClick={() => {
                  setShowAddGassInputs(true);
                }}
              >
                <FaPlus className="text-[#465462] text-[1.1rem] font-bold mr-5 ml-2" />
                Add Gas
              </label>
            </div>
          </div>
        </div>
        <div className="max767:w-[90%] max767:flex  max767:justify-center ">
          <button
            className={`relative text-center text-lg tracking-[1px] bg-[#90898E] no-underline text-white cursor-pointer transition-all ease-in-out duration-500  m-[15px] rounded-[40px] border-2 border-solid border-[#465462] hover:text-[white] shadow-[inset_0_0_0_0_#465462] hover:shadow-[inset_0_-100px_0_0_#465462] active:scale-90 mt-[20px] w-[297px] h-fit py-2 ml-5 max767:ml-0 flex items-center gap-x-2 justify-center text-[1.2rem] font-[700]`}
            // className={` bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
            onClick={async () => handleSave()}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
