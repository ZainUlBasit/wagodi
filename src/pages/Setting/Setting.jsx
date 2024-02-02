import React, { useState } from "react";
import { BiDetail } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { LuShoppingBag } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import ChangePassword from "../../components/Setting/ChangePassword";
import CompanyDetails from "../../components/Setting/CompanyDetails";
import Logout from "../../components/Modals/Logout";
import Navbar from "../../components/Navbar/Navbar";
import Subscription from "../../components/Setting/Subscription";
import LoggingOut from "../../components/Modals/LoggingOut";
import SideBtn from "../../components/buttons/setting/SideBtn";

const Setting = () => {
  const [ActiveButton, setActiveButton] = useState("CompanyDetails");
  const [OpenModal, setOpenModal] = useState(false);
  const [OpenLoggingOut, setOpenLoggingOut] = useState(false);
  return (
    <>
      {/* Main wrapper */}
      <div className="w-full flex justify-start fade-in h-[calc(100vh-88px)]">
        {/* Left Side */}
        <div className="flex flex-col justify-between h-full border-r-2 border-r-[#46546266] py-10 px-10 transition-all duration-500 ease-in-out">
          <div className="flex flex-col gap-y-3">
            <SideBtn
              ActiveButton={ActiveButton}
              setActiveButton={setActiveButton}
              FilterText={"CompanyDetails"}
              title={"Company Details"}
              Icon={BiDetail}
            />
            <SideBtn
              ActiveButton={ActiveButton}
              setActiveButton={setActiveButton}
              FilterText={"ChangePassword"}
              title={"Change password"}
              Icon={RiLockPasswordFill}
            />
            <SideBtn
              ActiveButton={ActiveButton}
              setActiveButton={setActiveButton}
              FilterText={"Subscription"}
              title={"Subscription"}
              Icon={LuShoppingBag}
            />
          </div>
          <div>
            <SideBtn
              ActiveButton={ActiveButton}
              setActiveButton={setActiveButton}
              FilterText={"Logout"}
              title={"Logout"}
              Icon={LuShoppingBag}
              onClick={() => {
                setOpenModal(true);
                setActiveButton("Logout");
              }}
            />
            {/* <div
              className={`flex transition-all duration-700 ease-in-out gap-x-4 items-center px-5 py-3 cursor-pointer rounded-full text-[#56636F] bg-white`}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <TbLogout className="text-[1.6rem] font-[700] font-[Quicksand]" />
              <span className="text-[1.3rem] font-[700] font-[Quicksand]">
                Logout
              </span>
            </div> */}
          </div>
        </div>
        {/* Right Side */}
        <div>{ActiveButton === "ChangePassword" && <ChangePassword />}</div>
        <div>{ActiveButton === "CompanyDetails" && <CompanyDetails />}</div>
        <div>{ActiveButton === "Subscription" && <Subscription />}</div>
      </div>
      {OpenModal && (
        <div className="rounded-[20px] overflow-hidden">
          <Logout
            Open={OpenModal}
            setOpen={setOpenModal}
            setOpenLoggingOut={setOpenLoggingOut}
          />
        </div>
      )}
      {OpenLoggingOut && (
        <div className="rounded-[20px] overflow-hidden">
          <LoggingOut Open={OpenLoggingOut} setOpen={setOpenLoggingOut} />
        </div>
      )}
    </>
  );
};

export default Setting;
