import React from "react";
import Logo from "../../assets/images/logo.png";
import AuthBtn from "../../components/buttons/AuthBtn";

const Splash = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <img src={Logo} className="w-[590px] h-[330px]" />
      <AuthBtn navigateTo={"/onboarding"} title={"Continue"} />
    </div>
  );
};

export default Splash;
