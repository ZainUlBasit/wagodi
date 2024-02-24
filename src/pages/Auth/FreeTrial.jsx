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
      {windowWidth > 767 ? <LogoDesign /> : <MobLogoDesign />}
      <div className="flex justify-center flex-col items-center w-[55%] fade-in max550:w-full">
        <FreeTrialBody />
      </div>
    </>
  );
};

export default FreeTrial;
