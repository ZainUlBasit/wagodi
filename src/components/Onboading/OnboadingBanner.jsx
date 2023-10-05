import React, { useState } from "react";
import Onboading from "../../assets/images/onboarding.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OnboadingComp from "./OnboadingComp";
import { useNavigate } from "react-router-dom";

const OnboadingBanner = () => {
  const [OpenComp, setOpenComp] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-fit mr-[80px]">
        <button className="absolute top-10 right-40 text-[24px]">Skip</button>
        <img src={Onboading} className="w-fit h-[40vh]" />
        {OpenComp ? (
          <OnboadingComp
            title={"Check Order History"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit."
            }
          />
        ) : (
          <OnboadingComp
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
                ? "w-[29px] h-[7px] bg-[#465462] rounded-[15px]"
                : "w-[42px] h-[7px] bg-[#465462] rounded-[15px]"
            }
            onClick={() => setOpenComp(true)}
          ></div>
          <div
            className={
              OpenComp
                ? "w-[42px] h-[7px] bg-[#465462] rounded-[15px]"
                : "w-[29px] h-[7px] bg-[#465462] rounded-[15px]"
            }
            onClick={() => setOpenComp(false)}
          ></div>
        </div>

        <button
          className="p-[10px] border-[2px] border-[#465462] text-[#465462] rounded-full hover:bg-[#465462] hover:text-white transition-all duration-500"
          onClick={() => navigate("/auth")}
        >
          <ArrowForwardIcon />
        </button>
      </div>
    </>
  );
};

export default OnboadingBanner;
