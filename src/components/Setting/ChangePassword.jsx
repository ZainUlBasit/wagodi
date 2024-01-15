import React, { useState } from "react";
import InputPassword from "../Input/InputPassword";
import MobNavbar from "../Navbar/MobNavbar";
import AuthInputPassword from "../Input/AuthInputPassword";

const ChangePassword = () => {
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  return (
    <>
      <div className="pl-5 max767:pl-0 max767:justify-center max767:items-center max767:flex max767:flex-col fade-in max767:mt-4">
        <div className="flex w-[90%] font-[600] text-[1.9rem] mb-8">Edit Password</div>
        <div className="w-[100%] flex flex-col justify-center items-center">
          <AuthInputPassword
            label={"Password"}
            placeholder={"*****************"}
            required={false}
            Value={Password}
            setValue={setPassword}
          />
          <AuthInputPassword
            label={"Confirm Password"}
            placeholder={"*****************"}
            required={false}
            Value={ConfirmPassword}
            setValue={setConfirmPassword}
          />
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center">
          <button
            className={`mt-[30px] w-[297px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
            onClick={() => {}}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
