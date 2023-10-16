import React from "react";
import Logo from "../../assets/images/logo.png";
import AuthBtn from "../../components/buttons/AuthBtn";
import { useNavigate } from "react-router-dom";
import "../../assets/Style/style.css";

const Splash = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center fade-in">
      <img src={Logo} className="h-[330px]" />
      <button
        className={`mt-[30px] w-[197px] h-[53px] bg-[#465462] rounded-[40px] text-white text-[30px] font-[700]`}
        onClick={() => navigate("/onboarding")}
      >
        Continue
      </button>
    </div>
  );
};

export default Splash;
