import React, { useEffect, useState } from "react";
import AuthInput from "../../components/Input/AuthInput";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/Input/Formik/CustomInput";

const Step2 = ({
  ProccessingData,
  CurrentTabNumber,
  setCurrentTabNumber,
  state,
  FormData,
  formik,
}) => {
  const [GasType, setGasType] = useState("");
  const [UOM, setUOM] = useState("Liters");
  const [BalanceVolume, setBalanceVolume] = useState("");
  const [RequireVolume, setRequireVolume] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setGasType(state.type === 0 ? "91" : state.type === 1 ? "95" : "D");
    setBalanceVolume(state.value);
  }, []);
  return (
    <div className="w-[718px] flex flex-col gap-x-10 pt-[45px] mt-10 shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] justify-between h-[446px] rounded-[15px] fade-in">
      <div className="w-[718px] flex gap-x-10 justify-center rounded-[15px]">
        {/* left side */}
        <div className="flex flex-col gap-y-5">
          <CustomInput
            name="fuel_type"
            label={"Gas Type"}
            placeholder={"95"}
            type="text"
            value={
              formik.values.fuel_type === 0
                ? "91"
                : formik.values.fuel_type === 1
                ? "95"
                : formik.values.fuel_type === 2
                ? "D"
                : ""
            }
          />
          <CustomInput
            name="uom"
            label={"UOM"}
            placeholder={"Litre"}
            type="text"
            value={"Litres"}
          />
        </div>
        {/* right side */}
        <div className="flex flex-col gap-y-5">
          <CustomInput
            name="value"
            label={"Balance Volume"}
            placeholder={"20,000"}
            type="number"
            value={formik.values.cur_value}
          />
          <CustomInput
            name="fuel_value"
            label={"Require Volume"}
            placeholder={"36,000"}
            type="number"
            value={formik.values.fuel_value}
            onChange={formik.handleChange}
            touched={formik.touched.fuel_value}
            isError={formik.errors.fuel_value}
            errorMsg={formik.errors.fuel_value}
          />
          {/* <AuthInput
            label={"Require Volume"}
            placeholder={"36,000"}
            required={false}
            Value={RequireVolume}
            setValue={setRequireVolume}
          /> */}
        </div>
      </div>
      <div className="w-full gap-x-3 flex justify-center items-center mb-10">
        <button
          className={`mt-[20px] w-[150px] h-fit py-2 text-[#90898E] hover:text-white hover:bg-[#90898E] rounded-[40px] bg-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out border-2 border-[#90898E]`}
          onClick={() => navigate("/home")}
        >
          Cancel
        </button>
        <button
          className={`mt-[20px] w-[150px] h-fit py-2 bg-[#90898E] border-2 border-[#90898E] hover:border-[#465462] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
          onClick={formik.handleSubmit}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Step2;
