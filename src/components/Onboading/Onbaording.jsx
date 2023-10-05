import React from "react";
import OnboadingBanner from "./OnboadingBanner";
import AuthBG from "../../assets/images/AuthBg.png";
import LogoWhite from "../../assets/images/logoWhite.png";

const Onbaording = () => {
  return (
    <>
      <div className="flex w-full h-screen  justify-between pr-[100px]">
        <img src={AuthBG} className="w-fit h-screen" />
        <img src={LogoWhite} className="w-[400px] absolute bottom-10 left-10" />
        <OnboadingBanner />
      </div>
    </>
  );
};

export default Onbaording;
