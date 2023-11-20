import React, { useEffect } from "react";
import LogOutLoader from "../Loaders/LogOutLoader";
import { useDispatch, useSelector } from "react-redux";
import { SetAuthNotFound } from "../../store/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const LogoutComp = () => {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.auth.auth);
  const navigate = useNavigate();

  const LogginOut = () => {
    localStorage.removeItem("user-data");
    localStorage.removeItem("logged-in");
    window.location.reload();
  };
  useEffect(() => {
    if (Auth) {
      setInterval(() => {
        LogginOut();
      }, 3000);
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <LogOutLoader />
    </div>
  );
};

export default LogoutComp;
