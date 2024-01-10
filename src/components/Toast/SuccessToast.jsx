import toast from "react-hot-toast";

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

export default SuccessToast;
