import React from "react";
import AuthBG from "../../assets/images/AuthBg.png";
import LogoWhite from "../../assets/images/logoWhite.png";

const LogoDesign = () => {
  return (
    <div className="relative">
      <img src={AuthBG} className="w-fit h-screen" />
      <img
        src={LogoWhite}
        className="w-[250px] absolute bottom-7 right-[25%]"
      />
    </div>
  );
};

export default LogoDesign;
