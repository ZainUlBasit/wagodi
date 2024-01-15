import React from "react";
import { toast } from "react-hot-toast";
import { MdWarning } from "react-icons/md";

const WarningToast = (msg) => {
  return toast(
    (t) => (
      <div className="flex items-center">
        <MdWarning size={30} color="#ff9800" />
        <div className="ml-2">
          <h2 className="text-yellow-600 font-bold">Warning!</h2>
          <p>{msg}</p>
        </div>
      </div>
    ),
    {
      duration: 4000,
      position: "top-right",
      style: {
        border: "1px solid #ff9800",
        padding: "16px",
        color: "#ff9800",
        backgroundColor: "white",
        fontFamily: "Quicksand",
      },
      iconTheme: {
        primary: "#ff9800",
        secondary: "white",
      },
    }
  );
};

export default WarningToast;
