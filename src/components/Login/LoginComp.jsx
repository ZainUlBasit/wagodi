import React, { useEffect, useState } from "react";
import AuthInput from "../Input/AuthInput";
import AuthInputPassword from "../Input/AuthInputPassword";
import AuthBtn from "../buttons/AuthBtn";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/Style/style.css";
import { SignInApi } from "../../Https";
import AddingLoader from "../Loaders/AddingLoader";
import { useDispatch } from "react-redux";
import { SetAuth } from "../../store/Slices/AuthSlice";
import toast, { Toaster } from "react-hot-toast";
import { MdWarning } from "react-icons/md";
import "./LoginComp.css";

const SuccessToast = (msg) => {
  return toast.success(msg, {
    duration: 4000,
    position: "top-right",
    style: {
      border: "1px solid green",
      padding: "16px",
      color: "green",
      backgroundColor: "white",
      fontFamily: "Quicksand",
    },
    iconTheme: {
      primary: "green",
      secondary: "white",
    },
  });
};
const ErrorToast = (msg) => {
  return toast.error(msg, {
    duration: 4000,
    position: "top-right",
    style: {
      border: "1px solid red",
      padding: "16px",
      color: "red",
      backgroundColor: "white",
      fontFamily: "Quicksand",
    },
    iconTheme: {
      primary: "red",
      secondary: "white",
    },
  });
};
const WarningToast = (msg) => {
  return toast(msg, {
    duration: 4000,
    position: "top-right",
    style: {
      border: "1px solid #ff9800",
      padding: "16px",
      color: "#ff9800",
      backgroundColor: "white",
      fontFamily: "Quicksand",
    },
    // Custom Icon
    icon: <MdWarning size={24} color="#ff9800" />,
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: "#000",
      secondary: "#fff",
    },
    // iconTheme: {
    // primary: "red",
    // secondary: "white",
    // },
  });
};

const LoginComp = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the response_type is set in localStorage
    const loggedIn = localStorage.getItem("logged-in");

    // If it's set, navigate to the home page
    if (loggedIn) {
      navigate("/home");
    }
  }, [localStorage]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let response;
    let response_type;
    try {
      response = await SignInApi({
        email: Email.toLowerCase(),
        password: Password,
      });
      console.log(response.data.success);
      response_type = response.data.success;
      if (response.data.success) {
        if (response.data.data.data.role > 2) {
          ErrorToast(
            "Only Admin, Company and Order Manager can access Web App!"
          );
          return;
        }
        SuccessToast(response.data?.data?.msg);
        localStorage.setItem("logged-in", response.data.success);
        // console.log(response)
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem(
          "companyData",
          JSON.stringify(response.data.data.data.companyId)
        );
        localStorage.setItem(
          "user-data",
          JSON.stringify(response.data.data.data)
        );
        dispatch(SetAuth(response.data.data.data));
      } else {
        const current_status = response.response?.status || response.status;
        alert(current_status);
        if (current_status === 200) {
          ErrorToast(response.data.error.msg);
        } else if (current_status === 401) {
          alert("yes");
          ErrorToast(response.response?.data?.error?.msg);
        }
      }
    } catch (err) {
      response = err;
      response_type = response.data?.success || false;
      ErrorToast(response.response?.data?.error?.msg);
    }
    // console.log(response_type);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <>
      <div className="w-[383px] max767:w-[95%] max767:mb-4 h-[496px] shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] flex items-center flex-col rounded-md pt-[40px] font-[Quicksand] fade-in LoginWrapper">
        <h1 className="w-full text-[1.9rem] font-[700] text-center WelcomeText">
          WELCOME BACK!
        </h1>
        <p className="mb-[80px] font-[300] DescText">
          Use Credentials to access your account
        </p>

        <form onKeyDown={handleKeyDown} className="flex flex-col gap-y-[2px]">
          <AuthInput
            label={"E-mail"}
            placeholder={"user123@gmail.com"}
            Value={Email}
            setValue={setEmail}
            required={false}
          />
          <div className="mb-1 LoginBet"></div>
          <AuthInputPassword
            label={"Password"}
            placeholder={"*************"}
            Value={Password}
            setValue={setPassword}
            required={false}
          />
        </form>

        <div className="mb-1"></div>
        <div className="w-[297px] flex justify-end mt-[-10px] mb-[60px] ForgetWrapper">
          {/* <div>
            <label>
              <input
                type="checkbox"
                className="mr-1"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
          </div> */}
          <Link to={"/forgot-password"} className="underline ForgetTextLogin">
            Forget Password?
          </Link>
        </div>
        {Loading ? (
          <AddingLoader />
        ) : (
          <AuthBtn title={"Sign In"} onSubmit={onSubmit} />
        )}
      </div>
    </>
  );
};

export default LoginComp;
