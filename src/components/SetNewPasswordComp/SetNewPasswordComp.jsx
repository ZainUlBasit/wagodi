import React, { useEffect, useState } from "react";
import AuthBtn from "../buttons/AuthBtn";
import { useNavigate } from "react-router-dom";
import AuthInput from "../Input/AuthInput";
import AuthInputPassword from "../Input/AuthInputPassword";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox" } };

const SetNewPasswordComp = () => {
  const navigate = useNavigate();
  const [NewPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center font-[Quicksand]">
        <div className="mt-10 pb-7 rounded-lg flex flex-col items-center w-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
          <div className="mt-5 px-7">
            <h1 className="w-full text-[1.6rem] font-[700] text-center">
              SET NEW PASSWORD
            </h1>
            <p className="mb-[50px] font-[300] text-center">
              Please set a new password to begin!
            </p>

            <AuthInputPassword
              label={"New Password"}
              placeholder={"*************************"}
              Value={NewPassword}
              setValue={setNewPassword}
              required={false}
            />
            <AuthInputPassword
              label={"Confirm Password"}
              placeholder={"*************************"}
              Value={ConfirmPassword}
              setValue={setConfirmPassword}
              required={false}
            />
          </div>
          <div className="w-[320px] flex justify-start mt-[-15px] mb-[20px] pl-2">
            <div className="w-full flex items-center justify-start">
              <Checkbox
                onChange={() => setRememberMe(!rememberMe)}
                checked={rememberMe}
                {...label}
                defaultChecked
                color="success"
              />
              <span className="font-[Quicksand] font-[300] ml-[-8px]">
                Remember Me
              </span>
            </div>
          </div>
          <p className="mt-[35px]">
            Remember Password?{" "}
            <span
              className="text-[#8B949D] cursor-pointer"
              //   onClick={() => navigate("/auth")}
              onClick={() => console.log(rememberMe)}
            >
              Sign In
            </span>
          </p>
          <AuthBtn title={"Continue"} navigateTo={"/auth"} />
        </div>
      </div>
    </>
  );
};

export default SetNewPasswordComp;
