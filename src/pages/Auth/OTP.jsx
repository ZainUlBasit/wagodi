import React, { useEffect, useState } from "react";
import OTPComp from "../../components/OTPComp/OTPComp";
import LogoDesign from "../../components/LogoDesign/LogoDesign";
import MobLogoDesign from "../../components/LogoDesign/MobLogoDesign";
import "../../assets/Style/style.css";
import { useLocation, useNavigate } from "react-router-dom";

const OTP = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const location = useLocation();
  const userId = location.state?.userId || null;

  useEffect(() => {
    if (userId === null) {
      navigate("/forgot-password");
    } else {
      console.log(userId);
    }
  }, []);

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
        <div className="w-[45%] max950:w-full h-screen flex justify-center items-center max767:items-start fade-in">
          <OTPComp userId={userId} />
        </div>
      </div>
    </>
  );
};

export default OTP;
