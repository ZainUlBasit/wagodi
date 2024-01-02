import React from "react";
import toast from "react-hot-toast";

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

export default ErrorToast;
