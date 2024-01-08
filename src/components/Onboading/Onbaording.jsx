import React from "react";
import OnboadingBanner from "./OnboadingBanner";
import AuthBG from "../../assets/images/AuthBg.png";
import LogoWhite from "../../assets/images/logoWhite.png";
import "../../assets/Style/style.css";
import MobOnboarding from "./MobOnboarding";
import LogoDesign from "../LogoDesign/LogoDesign";

const Onbaording = () => {
  return (
    <>
      <div className="flex w-full h-screen  justify-between pr-[100px] fade-in max767:hidden">
        <LogoDesign />
        <OnboadingBanner />
      </div>
      <MobOnboarding />
    </>
  );
};

export default Onbaording;
