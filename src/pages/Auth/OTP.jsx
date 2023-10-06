import React from "react";
import OTPComp from "../../components/OTPComp/OTPComp";
import LogoDesign from "../../components/LogoDesign/LogoDesign";

const OTP = () => {
  return (
    <>
      <div className="flex w-full h-screen  justify-between items-center pr-[100px]">
        <LogoDesign />
        <div className="w-[45%] h-screen flex justify-center items-center">
          <OTPComp />
        </div>
      </div>
    </>
  );
};

export default OTP;
