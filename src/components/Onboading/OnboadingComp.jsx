import React from "react";

const OnboadingComp = ({title,description}) => {
  return (
    <div className="mt-[25px] flex flex-col justify-center items-center">
      <p className="w-[400px] text-center text-[34px] font-[700]">{title}</p>
      <p className="w-[298px] text-center text-[24px] font-[300] mt-[25px]">
        {description}
      </p>
    </div>
  );
};

export default OnboadingComp;
