import React, { useEffect, useState } from "react";
import NavbarLogo from "../../assets/images/logoNavbar.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiNotification3Fill, RiSettings2Fill } from "react-icons/ri"; // Import eye icons from react-icons

const Navbar = () => {
  const [activeNavItem, setActiveNavItem] = useState(""); // State to track the active navigation item
  const location = useLocation(); // Get the current location from react-router-dom
  const [showNotificationDot, setShowNotificationDot] = useState(true);
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
    else if ("/ongoing-orders" === pathname)
      handleNavItemClick("ONGOING ORDERS");
    else if ("/orders-report" === pathname) handleNavItemClick("ORDER REPORTS");
    else if ("/users" === pathname) handleNavItemClick("USERS");
    else if ("/notification" === pathname) handleNavItemClick("Notification");
    else if ("/stations" === pathname) handleNavItemClick("STATION");
  }, []);

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="w-[90%] max-w-[1300px] flex justify-between items-center">
          {/* Left side Logo */}
          <img src={NavbarLogo} className="h-[76px] w-fit" />
          {/* Nav Items */}
          <nav className="flex gap-x-7 items-center font-[Quicksand]">
            <Link
              to={"/home"}
              className={`text-[18px] font-[700] ${
                activeNavItem === "HOME" ? "border-b-2 border-[#475562]" : ""
              }`}
              onClick={() => handleNavItemClick("HOME")}
            >
              HOME
            </Link>
            <Link
              to={"/ongoing-orders"}
              className={`text-[18px] font-[700] ${
                activeNavItem === "ONGOING ORDERS"
                  ? "border-b-2 border-[#475562]"
                  : ""
              }`}
              onClick={() => handleNavItemClick("ONGOING ORDERS")}
            >
              ONGOING ORDERS
            </Link>
            <Link
              to={"/orders-report"}
              className={`text-[18px] font-[700] ${
                activeNavItem === "ORDER REPORTS"
                  ? "border-b-2 border-[#475562]"
                  : ""
              }`}
              onClick={() => handleNavItemClick("ORDER REPORTS")}
            >
              ORDER REPORTS
            </Link>
            <Link
              to={"/users"}
              className={`text-[18px] font-[700] ${
                activeNavItem === "USERS" ? "border-b-2 border-[#475562]" : ""
              }`}
              onClick={() => handleNavItemClick("USERS")}
            >
              USERS
            </Link>
            <Link
              to={"/stations"}
              className={`text-[18px] font-[700] ${
                activeNavItem === "STATION" ? "border-b-2 border-[#475562]" : ""
              }`}
              onClick={() => handleNavItemClick("STATION")}
            >
              STATION
            </Link>
            <Link
              to={"/home"}
              className={`text-[18px] font-[700] ${
                activeNavItem === "STATISTICS"
                  ? "border-b-2 border-[#475562]"
                  : ""
              }`}
              onClick={() => handleNavItemClick("STATISTICS")}
            >
              STATISTICS
            </Link>
            <Link
              to={"/home"}
              className={`text-[18px] font-[700] ${
                activeNavItem === "VENDOR" ? "border-b-2 border-[#475562]" : ""
              }`}
              onClick={() => handleNavItemClick("VENDOR")}
            >
              VENDOR
            </Link>
          </nav>
          {/* Right Side Icons */}
          <div className="flex items-center gap-x-7 relative h-fit">
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
              <RiNotification3Fill />
            </div>
            <RiSettings2Fill className="cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
