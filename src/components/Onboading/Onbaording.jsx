import React from "react";
import OnboadingBanner from "./OnboadingBanner";
import AuthBG from "../../assets/images/AuthBg.png";
import LogoWhite from "../../assets/images/logoWhite.png";
import "../../assets/Style/style.css"

const Onbaording = () => {
  return (
    <>
      <div className="flex w-full h-screen  justify-between pr-[100px] fade-in">
        <div className="relative">
          <img src={AuthBG} className="w-fit h-screen" />
          <img
            src={LogoWhite}
            className="lg:w-[400px] w-[50rem] absolute bottom-7 right-10"
          />
        </div>
        <OnboadingBanner />
      </div>
    </>
  );
};

export default Onbaording;
