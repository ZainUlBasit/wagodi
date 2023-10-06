import React, { useRef, useState, useEffect } from "react";
import AuthBtn from "../buttons/AuthBtn";
import { useNavigate } from "react-router-dom";

const OTPComp = () => {
  const [otp, setOTP] = useState(["", "", "", ""]); // Initialize with empty strings
  const inputRefs = [useRef(), useRef(), useRef(), useRef()]; // Refs for each input field
  const [countdown, setCountdown] = useState(30); // Countdown timer
  const [timerRunning, setTimerRunning] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    if (timerRunning && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [timerRunning, countdown]);

  useEffect(() => {
    if (countdown === 0) {
      setTimerRunning(false);
    }
  }, [countdown]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Ensure the input is a single digit
    if (/^[0-9]$/.test(value) || value === "") {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Focus the next input field (if available)
      if (value !== "" && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  return (
    <>
      <div className="w-fit">
        <div className="mt-10 py-10 px-7 rounded-lg flex flex-col items-center justify-center w-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] font-[Quicksand]">
          <h1 className="w-full text-[1.9rem] font-[700] text-center">
            OTP Verification
          </h1>
          <p className="mb-[30px] font-[300] text-center w-full whitespace-nowrap">
            Enter the OTP sent to user123@gmail.com
          </p>

          {/* OTP Inputs */}
          <div className="flex">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                maxLength="1"
                ref={inputRefs[index]}
                className="border border-gray-300 rounded-md w-12 h-12 text-center m-2"
              />
            ))}
          </div>

          {/* Countdown Timer */}
          {countdown > 0 ? (
            <p className="mt-2 font-[Quicksand] font-[500]">
              00:{countdown} Sec
            </p>
          ) : (
            <p className="mt-2 font-[Quicksand] font-[500]">
              Didn’t receive code ?{" "}
              <span
                className="text-[#8B949D] cursor-pointer"
                onClick={() => {
                  setCountdown(30);
                  setTimerRunning(true);
                }}
              >
                Re-send
              </span>
            </p>
          )}

          {/* Footer */}
          <p className="mt-[35px] mb-4">
            Remember Password?{" "}
            <span
              className="text-[#8B949D] cursor-pointer"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </span>
          </p>
          <AuthBtn title={"Recover"} navigateTo={"/set-new-password"} />
        </div>
      </div>
    </>
  );
};

export default OTPComp;
