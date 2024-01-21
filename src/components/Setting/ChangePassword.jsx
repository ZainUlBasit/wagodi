import React, { useState } from "react";
import InputPassword from "../Input/InputPassword";
import MobNavbar from "../Navbar/MobNavbar";
import AuthInputPassword from "../Input/AuthInputPassword";
import { api } from "../../Https";
import { useSelector } from "react-redux";
import ErrorToast from "../Toast/ErrorToast";
import SuccessToast from "../Toast/SuccessToast";
import AddingLightLoader from "../Loaders/AddingLightLoader";
import WarningToast from "../Toast/WarningToast";

const ChangePassword = () => {
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const userData = useSelector((state) => state.auth.data);
  const [Loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    setLoading(true);
    if (Password === "") WarningToast("Please Enter Password...!");
    else if (ConfirmPassword === "")
      WarningToast("Please Enter Confirm Password...!");
    else if (Password != ConfirmPassword)
      ErrorToast("Password and Confirm Password does not match!");
    else {
      try {
        await api.patch("/auth/change-password", {
          id: userData._id,
          password: Password,
        });
        SuccessToast("Password Successfully Updated...");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        return ErrorToast("Error changing password!");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div className="pl-5 max767:pl-0 max767:justify-center max767:items-center max767:flex max767:flex-col fade-in max767:mt-4">
        <div className="flex w-[90%] font-[600] text-[1.9rem] mb-8">
          Edit Password
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center">
          <AuthInputPassword
            label={"Password"}
            placeholder={"*****************"}
            required={false}
            Value={Password}
            setValue={setPassword}
          />
          <AuthInputPassword
            label={"Confirm Password"}
            placeholder={"*****************"}
            required={false}
            Value={ConfirmPassword}
            setValue={setConfirmPassword}
          />
        </div>
        <div className="w-[100%] flex flex-col justify-center items-center">
          {Loading ? (
            <div className="mt-[30px]">
              <AddingLightLoader />
            </div>
          ) : (
            <button
              className={`mt-[30px] w-[297px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
              onClick={() => handlePasswordChange()}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
