import React from "react";
import { useNavigate } from "react-router-dom";

const AuthBtn = ({ title, navigateTo }) => {
  const navigate = useNavigate();
  return (
    <button
      className={`mt-[20px] w-[197px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
      onClick={() => navigate(navigateTo)}
    >
      {title}
    </button>
  );
};

export default AuthBtn;
