import AuthBG from "../../assets/images/AuthBg.png";
import LogoWhite from "../../assets/images/logoWhite.png";
import LoginComp from "../../components/Login/LoginComp";
import Register from "../../components/Register/Register";
import React, { useEffect, useState } from "react";
import "../../assets/Style/style.css";
import LogoDesign from "../../components/LogoDesign/LogoDesign";
import MobLogoDesign from "../../components/LogoDesign/MobLogoDesign";

const Auth = () => {
  const [IsLogin, setIsLogin] = useState(true);

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
      <div className="flex w-[100vw] h-screen justify-between items-center pr-[100px] max950:flex-col max950:pr-0 max767:items-center">
        {windowWidth > 767 ? <LogoDesign /> : <MobLogoDesign />}
        <div className="flex justify-center flex-col items-center w-[55%] fade-in max550:w-full">
          {/* button / login and register page */}
          <div className="bg-[#EFE7EC] text-[#586571] overflow-hidden rounded-[100px] font-[Quicksand] font-[700] w-fit mb-5">
            <button
              className={`${
                !IsLogin
                  ? "h-full py-3 max767:py-2 px-5 text-[30px]"
                  : "bg-[#465462E5] text-[#EFE7EC] h-full py-3 max767:py-2 px-5 rounded-[100px] text-[30px]"
              } maxWeb1:text-[2.5rem] maxWeb2:text-[3rem] maxWeb3:text-[3.5rem] maxWeb4:text-[4rem]`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={`${
                IsLogin
                  ? " h-full py-3 max767:py-2 px-5 text-[30px]"
                  : "bg-[#465462E5] text-[#EFE7EC] h-full py-3 max767:py-2 px-5 rounded-[100px] text-[30px]"
              } maxWeb1:text-[2.5rem] maxWeb2:text-[3rem] maxWeb3:text-[3.5rem] maxWeb4:text-[4rem]`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
          {IsLogin ? <LoginComp /> : <Register />}
        </div>
      </div>
    </>
  );
};

export default Auth;
