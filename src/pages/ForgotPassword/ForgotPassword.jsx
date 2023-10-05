import React from "react";
import AuthBG from "../../assets/images/AuthBg.png";
import LogoWhite from "../../assets/images/logoWhite.png";
import ForgotPasswordComp from "../../components/ForgotPasswordComp/ForgotPasswordComp";

const ForgotPassword = () => {
  return (
    <div className="flex w-full h-screen  justify-between items-center pr-[100px]">
      <div className="relative">
        <img src={AuthBG} className="w-fit h-screen" />
        <img
          src={LogoWhite}
          className="lg:w-[400px] w-[50rem] absolute bottom-7 right-10"
        />
      </div>
      <ForgotPasswordComp />
    </div>
  );
};

export default ForgotPassword;
