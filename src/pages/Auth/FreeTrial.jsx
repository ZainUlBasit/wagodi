import React, { useEffect, useState } from "react";
import LogoDesign from "../../components/LogoDesign/LogoDesign";
import MobLogoDesign from "../../components/LogoDesign/MobLogoDesign";
import FreeTrialBody from "../../components/FreeTrial/FreeTrialBody";

const FreeTrial = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
  }, []);
  return (
    <>
      <div className="flex w-[100vw] h-screen justify-between items-center pr-[100px] max950:flex-col max950:pr-0 max767:items-center">
        {windowWidth > 767 ? <LogoDesign /> : <MobLogoDesign />}
        <div className="flex justify-center flex-col items-center w-[55%] fade-in max550:w-full">
          <FreeTrialBody />
        </div>
      </div>
    </>
  );
};

export default FreeTrial;
