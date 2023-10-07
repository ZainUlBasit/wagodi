import React, { useState } from "react";
import AuthInput from "../Input/AuthInput";
import AuthInputPassword from "../Input/AuthInputPassword";
import AuthBtn from "../buttons/AuthBtn";
import { useNavigate } from "react-router-dom";

const LoginComp = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate()
  return (
    <>
      <div className="w-[343px] h-[440px] shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] flex items-center flex-col rounded-md pt-[20px] font-[Quicksand]">
        <h1 className="w-full text-[1.9rem] font-[700] text-center">
          WELCOME BACK!
        </h1>
        <p className="mb-[50px] font-[300]">
          Use Credentials to access your account
        </p>
        <AuthInput
          label={"E-mail"}
          placeholder={"user123@gmail.com"}
          Value={Email}
          setValue={setEmail}
          required={false}
        />
        <AuthInputPassword
          label={"Password"}
          placeholder={"*************"}
          Value={Password}
          setValue={setPassword}
          required={false}
        />
        <div className="w-[297px] flex justify-between mt-[-10px] mb-[60px]">
          <div>
            <label>
              <input
                type="checkbox"
                className="mr-1"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
          </div>
          <div className="cursor-pointer" onClick={() => navigate("/forgot-password")}>Forget Password?</div>
        </div>
        <AuthBtn title={"Sign In"} navigateTo={"/home"} />
      </div>
    </>
  );
};

export default LoginComp;
