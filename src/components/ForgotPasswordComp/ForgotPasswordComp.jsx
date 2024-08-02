import React, { useState } from "react";
import AuthBG from "../../assets/images/AuthBg.png";
import forgotpassword from "../../assets/images/forgotpassword.png";
import AuthInput from "../Input/AuthInput";
import AuthBtn from "../buttons/AuthBtn";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ForgetPasswordApi } from "../../Https";

const ForgotPasswordComp = () => {
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ForgetPasswordApi({ mobile: Email });
      console.log(response);
      toast.success(response.data.data.msg);
      navigate("/otp-verification", {
        state: { userId: response.data.data.id },
      });
    } catch (err) {
      toast.error(err.response.data.error.msg);
    }
  };
  return (
    <>
      <div className=" flex flex-col items-center">
        <img src={forgotpassword} className="w-fit h-[25vh]" />
        <div className="mt-10 pb-7 rounded-lg flex flex-col items-center w-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] font-[Quicksand]">
          <div className="mt-5 px-7 flex flex-col justify-center items-center">
            <h1 className="w-full text-[1.9rem] font-[700] text-center">
              FORGOT PASSWORD?
            </h1>
            <p className="mb-[50px] font-[300]">
              Don’t worry! It happens. Please enter your email.
            </p>

            <AuthInput
              label={"Mobile Number"}
              placeholder={"1234567890"}
              Value={Email}
              setValue={setEmail}
              required={false}
            />
          </div>
          <p className="mt-[35px]">
            Remember Password?{" "}
            <span
              className="text-[#8B949D] cursor-pointer"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </span>
          </p>
          <AuthBtn title={"Continue"} onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordComp;
