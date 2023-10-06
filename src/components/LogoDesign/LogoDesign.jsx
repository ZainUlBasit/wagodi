import React from "react";
import AuthBG from "../../assets/images/AuthBg.png";
import LogoWhite from "../../assets/images/logoWhite.png";

const LogoDesign = () => {
  return (
    <div className="relative">
      <img src={AuthBG} className="w-fit h-screen" />
      <img
        src={LogoWhite}
        className="lg:w-[400px] w-[50rem] absolute bottom-7 right-10"
      />
    </div>
  );
};

export default LogoDesign;
