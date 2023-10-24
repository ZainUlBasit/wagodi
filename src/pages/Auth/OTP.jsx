import React, { useEffect, useState } from "react";
import OTPComp from "../../components/OTPComp/OTPComp";
import LogoDesign from "../../components/LogoDesign/LogoDesign";
import MobLogoDesign from "../../components/LogoDesign/MobLogoDesign";
import "../../assets/Style/style.css";

const OTP = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update the width value when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that this effect runs once after the initial render
  return (
    <>
      <div className="flex w-full h-screen  justify-between items-center max767:items-start pr-[100px] max950:flex-col max950:pr-0">
        {windowWidth > 767 ? <LogoDesign /> : <MobLogoDesign />}
        <div className="w-[45%] max950:w-full h-screen flex justify-center items-center fade-in">
          <OTPComp />
        </div>
      </div>
    </>
  );
};

export default OTP;
