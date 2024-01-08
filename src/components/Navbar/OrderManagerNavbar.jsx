import React, { useEffect, useState } from "react";
import NavbarLogo from "../../assets/images/logoNavbar.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiNotification3Fill, RiSettings2Fill } from "react-icons/ri"; // Import eye icons from react-icons
import "./Navbar.css";
import { TbLogout } from "react-icons/tb";
import Logout from "../Modals/Logout";
import LoggingOut from "../Modals/LoggingOut";

const OrderManagerNavbar = () => {
  const [activeNavItem, setActiveNavItem] = useState(""); // State to track the active navigation item
  const location = useLocation(); // Get the current location from react-router-dom
  const [showNotificationDot, setShowNotificationDot] = useState(true);
  const [OpenModal, setOpenModal] = useState(false);
  const [OpenLoggingOut, setOpenLoggingOut] = useState(false);
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
    if ("/order-manager-home" === pathname) handleNavItemClick("HOME");
    else if ("/ongoing-orders" === pathname)
      handleNavItemClick("ONGOING ORDERS");
    else if ("/add-reservation" === pathname) handleNavItemClick("HOME");
    else if ("/orders-report-info" === pathname)
      handleNavItemClick("ORDER REPORTS");
    else if ("/order-manager-orders-report" === pathname)
      handleNavItemClick("ORDER REPORTS");
    else if ("/users" === pathname) handleNavItemClick("USERS");
    else if ("/notification" === pathname) handleNavItemClick("Notification");
    else if ("/setting" === pathname) handleNavItemClick("Setting");
    else if ("/stations" === pathname) handleNavItemClick("STATION");
  }, []);

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="w-[90%] max-w-[1300px] flex justify-between items-center">
          {/* Left side Logo */}
          <Link
            to={"/order-manager-home"}
            onClick={() => handleNavItemClick("HOME")}
          >
            <img src={NavbarLogo} className="h-[76px] w-fit mt-3" />
          </Link>
          {/* Middle Nav Items */}
          <nav className="flex items-center justify-between font-[Quicksand] gap-x-8">
            <div className="relative overflow-hidden">
              <Link
                to={"/home"}
                className={`text-[18px] font-[700]`}
                onClick={() => handleNavItemClick("HOME")}
              >
                HOME
              </Link>
              {activeNavItem === "HOME" && (
                <div className="box-below-link active"></div>
              )}
            </div>

            <div className="relative overflow-hidden">
              <Link
                to={"/order-manager-orders-report"}
                className={`text-[18px] font-[700]`}
                onClick={() => handleNavItemClick("ORDER REPORTS")}
              >
                ORDER REPORTS
              </Link>
              {activeNavItem === "ORDER REPORTS" && (
                <div className="box-below-link active"></div>
              )}
            </div>
          </nav>
          {/* Right Side Icons */}
          <div className="flex items-center gap-x-3 relative h-fit">
            {showNotificationDot && (
              <div className="h-[9px] w-[9px] bg-[#FF4423] rounded-full absolute top-[2px] left-[24px]"></div>
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
              <RiNotification3Fill className="text-[1.2rem]" />
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
              <TbLogout className="cursor-pointer text-[1.2rem]" />
            </div>
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
      {OpenLoggingOut && (
        <div className="rounded-[20px] overflow-hidden">
          <LoggingOut Open={OpenLoggingOut} setOpen={setOpenLoggingOut} />
        </div>
      )}
    </>
  );
};

export default OrderManagerNavbar;
