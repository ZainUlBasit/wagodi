import React, { useEffect, useState } from "react";
import MobLogoDesign from "../../components/LogoDesign/MobLogoDesign";
import LogoDesign from "../../components/LogoDesign/LogoDesign";
import SetNewPasswordComp from "../../components/SetNewPasswordComp/SetNewPasswordComp";
import "../../assets/Style/style.css";
import { useLocation } from "react-router-dom";

const SetNewPassword = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const location = useLocation();
  const userId = location.state?.userId || null;
  const otpId = location.state?.otpId || null;

  useEffect(() => {
    if (userId === null || otpId === null) {
      navigate("/forgot-password");
    } else {
      console.log(userId, otpId);
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
  }, []); // Empty dependency array ensures that this effect runs once after the initial render  return (
  return (
    <>
      <div className="flex w-full h-screen  justify-between items-center max767:items-start pr-[100px] max950:flex-col max950:pr-0">
        {windowWidth > 767 ? <LogoDesign /> : <MobLogoDesign />}
        <div className="w-[45%] max950:w-full h-screen flex justify-center items-center max767:items-start fade-in">
          <SetNewPasswordComp userId={userId} otpId={otpId} />
        </div>
      </div>
    </>
  );
};

export default SetNewPassword;
