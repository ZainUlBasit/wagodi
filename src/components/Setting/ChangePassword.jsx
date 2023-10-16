import React, { useState } from "react";
import InputPassword from "../Input/InputPassword";

const ChangePassword = () => {
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  return (
    <>
      <div className="pl-5 fade-in">
        <div className="flex font-[600] text-[1.9rem] mb-8">Edit Password</div>
        <div>
          <InputPassword
            label={"Password"}
            placeholder={"*****************"}
            required={false}
            Value={Password}
            setValue={setPassword}
          />
          <InputPassword
            label={"Confirm Password"}
            placeholder={"*****************"}
            required={false}
            Value={ConfirmPassword}
            setValue={setConfirmPassword}
          />
        </div>
        <div>
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
