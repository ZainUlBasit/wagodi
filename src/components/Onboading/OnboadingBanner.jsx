import React, { useState } from "react";
import Onboading from "../../assets/images/onboarding.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OnboadingComp from "./OnboadingComp";
import { useNavigate } from "react-router-dom";

const OnboadingBanner = () => {
  const [OpenComp, setOpenComp] = useState(true);
  const [Itertaion, setItertaion] = useState(0);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-[55%]">
        <div className="relative">
          <img src={Onboading} className="w-fit h-[40vh]" />
          <button
            className="absolute -top-4 right-[-40px] text-[24px] font-[700]"
            onClick={() => navigate("/auth")}
          >
            Skip
          </button>
        </div>
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
                ? "w-[29px] transition-all duration-700 ease-in-out h-[7px] bg-[#465462] rounded-[15px]"
                : "w-[42px] transition-all duration-700 ease-in-out h-[7px] bg-[#465462] rounded-[15px]"
            }
          ></div>
          <div
            className={
              OpenComp
                ? "w-[42px] transition-all duration-700 ease-in-out h-[7px] bg-[#465462] rounded-[15px]"
                : "w-[29px] transition-all duration-700 ease-in-out h-[7px] bg-[#465462] rounded-[15px]"
            }
          ></div>
        </div>

        <button
          className="p-[10px] border-[2px] border-[#465462] text-[#465462] rounded-full hover:bg-[#465462] hover:text-white transition-all duration-500"
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
    </>
  );
};

export default OnboadingBanner;
