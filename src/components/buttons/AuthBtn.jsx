import React from "react";
import { useNavigate } from "react-router-dom";

const AuthBtn = ({ title, navigateTo }) => {
  const navigate = useNavigate();
  return (
    <button
      className="mt-[-40px] w-[197px] h-[53px] bg-[#465462] rounded-[40px] text-white text-[30px] font-[700]"
      onClick={() => navigate(navigateTo)}
    >
      {title}
    </button>
  );
};

export default AuthBtn;
