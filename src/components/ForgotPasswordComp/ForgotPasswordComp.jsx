import React, { useState } from "react";
import AuthBG from "../../assets/images/AuthBg.png";
import forgotpassword from "../../assets/images/forgotpassword.png";
import AuthInput from "../Input/AuthInput";
import AuthBtn from "../buttons/AuthBtn";

const ForgotPasswordComp = () => {
  const [Email, setEmail] = useState("");
  return (
    <>
      <div className="flex flex-col">
        <img src={forgotpassword} className="w-fit h-[30vh]" />
        <div className="mt-10">
          <h1>FORGOT PASSWORD?</h1>
          <p>Don’t worry! It happens. Please enter your email.</p>
          <AuthInput
            label={"E-mail"}
            placeholder={"user123@gmail.com"}
            Value={Email}
            setValue={setEmail}
            required={false}
          />
        </div>
        <p>
          Remember Password? <span>Sign In</span>
        </p>
        <AuthBtn title={"Continue"} navigateTo={"/auth"} />
      </div>
    </>
  );
};

export default ForgotPasswordComp;
