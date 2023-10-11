import React from "react";
import ForgotPasswordComp from "../../components/ForgotPasswordComp/ForgotPasswordComp";
import LogoDesign from "../../components/LogoDesign/LogoDesign";
import "../../assets/Style/style.css"

const ForgotPassword = () => {
  return (
    <div className="flex w-full h-screen  justify-between items-center pr-[100px] fade-in">
      <LogoDesign />
      <div className="w-[45%] h-screen flex justify-center items-center">
        <ForgotPasswordComp />
      </div>
    </div>
  );
};

export default ForgotPassword;
