import React from "react";
import AuthBG from "../../assets/images/AuthBg.png";
import LogoWhite from "../../assets/images/logoWhite.png";
import LogoBackG from "../../assets/images/LogoBackG.svg";

const MobLogoDesign = () => {
  return (
    <div className="relative w-full">
      <img src={LogoBackG} className="w-full h-full" />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <img
          src={LogoWhite}
          className="w-[200px] max467:w-[150px]"
        />
      </div>
    </div>
  );
};

export default MobLogoDesign;
