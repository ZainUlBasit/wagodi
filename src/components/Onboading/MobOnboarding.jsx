import React, { useState } from "react";
import Onboading from "../../assets/images/onboarding.png";
import MobOnboardingImg from "../../assets/images/MobOnboardingImg.png";
import { useNavigate } from "react-router-dom";
import OnboadingComp from "./OnboadingComp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MobOnboarding = () => {
  const [OpenComp, setOpenComp] = useState(true);
  const [Itertaion, setItertaion] = useState(0);
  const navigate = useNavigate();
  return (
    <div className="max767:flex flex-col hidden w-[100%] h-screen overflow-hidden justify-between items-center fade-in">
      <div className="flex flex-col justify-center items-center h-[40%] w-[100%]">
        <div className="relative flex justify-center items-center">
          <img src={Onboading} className="w-fit h-[30vh]" />
          <button
            className="absolute -top-4 right-[-35px] text-[24px] font-[700]"
            onClick={() => navigate("/auth")}
          >
            Skip
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-[60%] w-[100%] relative">
        <img src={MobOnboardingImg} className="w-[100vw]" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center pt-10">
          {OpenComp ? (
            <OnboadingComp
              isOpen={"slide-in-right"}
              title={"Check Order History"}
              description={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit."
              }
            />
          ) : (
            <OnboadingComp
              isOpen={"slide-in-left"}
              title={"Check Statistics"}
              description={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit."
              }
            />
          )}

          <div className="flex gap-x-2 mt-8 mb-5">
            <div
              className={
                OpenComp
                  ? "w-[29px] transition-all duration-700 ease-in-out h-[7px] bg-[#fff] rounded-[15px]"
                  : "w-[42px] transition-all duration-700 ease-in-out h-[7px] bg-[#fff] rounded-[15px]"
              }
            ></div>
            <div
              className={
                OpenComp
                  ? "w-[42px] transition-all duration-700 ease-in-out h-[7px] bg-[#fff] rounded-[15px]"
                  : "w-[29px] transition-all duration-700 ease-in-out h-[7px] bg-[#fff] rounded-[15px]"
              }
            ></div>
          </div>

          <button
            className="p-[10px] border-[2px] border-white text-white rounded-full hover:bg-[#465462] hover:text-white transition-all duration-500"
            onClick={() => {
              setItertaion(Itertaion + 1);
              if (Itertaion === 1) {
                navigate("/auth");
              } else {
                setOpenComp(!OpenComp);
              }
            }}
          >
            <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobOnboarding;
