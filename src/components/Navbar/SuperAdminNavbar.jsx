import React, { useEffect, useState } from "react";
import NavbarLogo from "../../assets/images/logoNavbar.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiNotification3Fill, RiSettings2Fill } from "react-icons/ri"; // Import eye icons from react-icons
import "./Navbar.css";
import { TbLogout } from "react-icons/tb";
import Logout from "../Modals/Logout";
import LoggingOut from "../Modals/LoggingOut";
import { BiUserPin } from "react-icons/bi";
import AddInfoModal from "../Modals/AddInfo";
import LanguageChangeBtn from "../buttons/LanguageChangeBtn";
import { useTranslation } from "react-i18next";

const SuperAdminNavbar = () => {
  const [t, i18n] = useTranslation("global");

  const [activeNavItem, setActiveNavItem] = useState(""); // State to track the active navigation item
  const location = useLocation(); // Get the current location from react-router-dom
  const [showNotificationDot, setShowNotificationDot] = useState(true);
  const [OpenModal, setOpenModal] = useState(false);
  const [OpenLoggingOut, setOpenLoggingOut] = useState(false);
  const [OpenDataModal, setOpenDataModal] = useState("");
  const navigate = useNavigate();

  // Function to handle click on navigation items and set the active item
  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
  };

  const handleNotificationClick = () => {
    setShowNotificationDot(false);
  };

  const pathname = location.pathname;
  useEffect(() => {
    if ("/home" === pathname) handleNavItemClick("HOME");
    else if ("/subscription-requests" === pathname)
      handleNavItemClick("Subscription Requests");
    else if ("/control-subscribers" === pathname)
      handleNavItemClick("Control Subscribers");
  }, []);

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="w-[90%] maxWeb1:max-w-[1900px] maxWeb2:max-w-[2500px] maxWeb3:max-w-[3800px] maxWeb4:max-w-[3400px] flex justify-between items-center">
          {/* Left side Logo */}
          <Link to={"/home"} onClick={() => handleNavItemClick("HOME")}>
            <img
              src={NavbarLogo}
              className="h-[76px] maxWeb1:h-[120px]  maxWeb2:h-[200px] maxWeb3:h-[250px] maxWeb4:h-[220px] w-fit mt-3"
            />
          </Link>
          {/* Middle Nav Items */}
          <nav className="flex items-center justify-between font-[Quicksand] gap-x-8">
            <div className="relative overflow-hidden">
              <Link
                to={"/home"}
                className={`text-[18px] font-[700] maxWeb1:text-[25px] maxWeb2:text-[30px] maxWeb3:text-[35px] maxWeb4:text-[40px]`}
                onClick={() => handleNavItemClick("HOME")}
              >
                {t("CompanyControls.CompaniesInformation")}
              </Link>
              {activeNavItem === "HOME" && (
                <div className="box-below-link active"></div>
              )}
            </div>

            <div className="relative overflow-hidden">
              <Link
                to={"/subscription-requests"}
                className={`text-[18px] font-[700] maxWeb1:text-[25px] maxWeb2:text-[30px] maxWeb3:text-[35px] maxWeb4:text-[40px]`}
                onClick={() => handleNavItemClick("Subscription Requests")}
              >
                {t("CompanyControls.SubscriptionRequests")}
              </Link>
              {activeNavItem === "Subscription Requests" && (
                <div className="box-below-link active"></div>
              )}
            </div>
            <div className="relative overflow-hidden">
              <Link
                to={"/control-subscribers"}
                className={`text-[18px] font-[700] maxWeb1:text-[25px] maxWeb2:text-[30px] maxWeb3:text-[35px] maxWeb4:text-[40px]`}
                onClick={() => handleNavItemClick("Control Subscribers")}
              >
                {t("CompanyControls.ControlSubscribers")}
              </Link>
              {activeNavItem === "Control Subscribers" && (
                <div className="box-below-link active"></div>
              )}
            </div>
          </nav>
          {/* Right Side Icons */}
          <div className="flex items-center gap-x-3 relative h-fit">
            {showNotificationDot && (
              <div className="h-[9px] w-[9px] maxWeb1:w-[15px] maxWeb1:h-[15px] bg-[#FF4423] rounded-full absolute top-[2px] maxWeb1:top-0 left-[24px] maxWeb1:left-[35px]"></div>
            )}
            <div
              className={`cursor-pointer py-[6px] px-[6px] border-2 rounded-full ${
                activeNavItem === "Notification"
                  ? "border-[#475562]"
                  : "border-[#fff]"
              }`}
              onClick={() => {
                handleNotificationClick();
                handleNavItemClick("Notification");
                navigate("/notification");
              }}
            >
              <RiNotification3Fill className="cursor-pointer maxWeb1:text-[2rem] maxWeb2:text-[2.3rem] maxWeb3:text-[2.9rem] maxWeb4:text-[2.6rem]" />
            </div>
            <div
              className={`cursor-pointer py-[6px] px-[6px] border-2 rounded-full ${
                activeNavItem === "uaer" ? "border-[#475562]" : "border-[#fff]"
              }`}
              onClick={() => {
                // handleNavItemClick("Setting");
                // navigate("/setting");
                setOpenDataModal(true);
              }}
            >
              <BiUserPin className="cursor-pointer maxWeb1:text-[3rem] maxWeb2:text-[3.3rem] maxWeb3:text-[3.9rem] maxWeb4:text-[3.6rem]" />
            </div>
            <div
              className={`cursor-pointer py-[6px] px-[6px] border-2 rounded-full ${
                activeNavItem === "Setting"
                  ? "border-[#475562]"
                  : "border-[#fff]"
              }`}
              onClick={() => {
                handleNavItemClick("Setting");
                // navigate("/setting");
                setOpenModal(true);
              }}
            >
              <TbLogout className="cursor-pointer maxWeb1:text-[2rem] maxWeb2:text-[2.3rem] maxWeb3:text-[2.9rem] maxWeb4:text-[2.6rem]" />
            </div>
            <LanguageChangeBtn />
          </div>
        </div>
      </div>
      {OpenModal && (
        <Logout
          Open={OpenModal}
          setOpen={setOpenModal}
          setOpenLoggingOut={setOpenLoggingOut}
        />
      )}
      {OpenDataModal && (
        <AddInfoModal Open={OpenDataModal} setOpen={setOpenDataModal} />
      )}
      {OpenLoggingOut && (
        <div className="rounded-[20px] overflow-hidden">
          <LoggingOut Open={OpenLoggingOut} setOpen={setOpenLoggingOut} />
        </div>
      )}
    </>
  );
};

export default SuperAdminNavbar;
