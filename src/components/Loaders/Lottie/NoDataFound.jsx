import Lottie from "lottie-react";
import React from "react";
import NDF from "../../../assets/Lottiefiles/no_data_found.json";

const NoDataFound = () => {
  return (
    <div className="flex justify-center items-center h-[70vh] w-full overflow-hidden">
      <Lottie animationData={NDF} loop={true} />
    </div>
  );
};

export default NoDataFound;
