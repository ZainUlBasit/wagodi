import React from "react";
import Success from "../../assets/images/Success.png";
import { useNavigate } from "react-router-dom";

const Step3 = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[718px] flex flex-col gap-x-10 pt-[45px] mt-10 shadow-[rgba(14,30,37,0.12)_0px_2px_4px_0px,rgba(14,30,37,0.32)_0px_2px_16px_0px] justify-between h-[446px] rounded-[15px] fade-in">
      <div className="w-[718px] flex flex-col items-center gap-x-10 justify-center rounded-[15px] font-[Quicksand]">
        <img src={Success} className="w-[230px]" />
        <span className="text-[#2EB100] text-[1.9rem] font-bold mt-2">
          Congratulations !
        </span>
        <span className="text-[#353432] text-[1.3rem] font-medium mt-2">
          Your Order has been placed
        </span>
      </div>
      <div className="w-full gap-x-3 flex justify-center items-center mb-10">
        <button
          className={`mt-[20px] w-fit h-fit py-2 px-5 bg-[#90898E] border-2 border-[#90898E] hover:border-[#465462] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
          onClick={() => navigate("/home")}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Step3;
