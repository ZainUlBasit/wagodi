import AuthBG from "../../assets/images/AuthBg.png";
import LogoWhite from "../../assets/images/logoWhite.png";
import LoginComp from "../../components/Login/LoginComp";
import Register from "../../components/Register/Register";
import React, { useState } from "react";
const Auth = () => {
  const [IsLogin, setIsLogin] = useState(true);
  return (
    <>
      <div className="flex w-full h-screen  justify-between items-center pr-[100px]">
        <div className="relative">
          <img src={AuthBG} className="w-fit h-screen" />
          <img
            src={LogoWhite}
            className="lg:w-[400px] w-[50rem] absolute bottom-7 right-10"
          />
        </div>
        <div className="flex justify-center flex-col items-center w-[55%]">
          <div className="bg-[#EFE7EC] text-[#586571] overflow-hidden rounded-[100px] font-[Quicksand] font-[700] w-fit mb-5">
            <button
              className={
                !IsLogin
                  ? " h-full py-3 px-5 text-[30px]"
                  : "bg-[#465462E5] text-[#EFE7EC] h-full py-3 px-5 rounded-[100px] text-[30px]"
              }
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={
                IsLogin
                  ? " h-full py-3 px-5 text-[30px]"
                  : "bg-[#465462E5] text-[#EFE7EC] h-full py-3 px-5 rounded-[100px] text-[30px]"
              }
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
          {IsLogin ? <LoginComp /> : <Register />}
        </div>
      </div>
    </>
  );
};

export default Auth;
