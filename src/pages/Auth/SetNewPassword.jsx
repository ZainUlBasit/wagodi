import React from "react";
import LogoDesign from "../../components/LogoDesign/LogoDesign";
import SetNewPasswordComp from "../../components/SetNewPasswordComp/SetNewPasswordComp";

const SetNewPassword = () => {
  return (
    <>
      <div className="flex w-full h-screen  justify-between items-center pr-[100px]">
        <LogoDesign />
        <div className="w-[45%] h-screen flex justify-center items-center">
          <SetNewPasswordComp />
        </div>
      </div>
    </>
  );
};

export default SetNewPassword;
