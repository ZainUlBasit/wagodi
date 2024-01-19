import React from "react";

const HeaderWrapper = ({ children }) => {
  return (
    <div className="w-[90%] max-w-[1200px] maxWeb1:max-w-[1900px] maxWeb2:max-w-[2500px] maxWeb3:max-w-[3800px] maxWeb4:max-w-[3400px] flex justify-end mt-6 mb-10">
      {children}
    </div>
  );
};

export default HeaderWrapper;
