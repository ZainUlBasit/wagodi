import React, { useEffect, useState } from "react";
import NavbarLogo from "../../assets/images/logoNavbar.png";
import { Link, useLocation } from "react-router-dom";
import { RiNotification3Fill, RiSettings2Fill } from "react-icons/ri"; // Import eye icons from react-icons

const Navbar = () => {
  const [activeNavItem, setActiveNavItem] = useState(""); // State to track the active navigation item
  const location = useLocation(); // Get the current location from react-router-dom
  const [showNotificationDot, setShowNotificationDot] = useState(true);

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
  }, []);

  return (
    <>
      <div className="w-full h-fit flex justify-center items-center">
        <div className="w-[90%] max-w-[1200px] flex justify-between items-center">
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
              to={"/home"}
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
              to={"/home"}
              className={`text-[18px] font-[700] ${
                activeNavItem === "USERS" ? "border-b-2 border-[#475562]" : ""
              }`}
              onClick={() => handleNavItemClick("USERS")}
            >
              USERS
            </Link>
            <Link
              to={"/home"}
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
              <div className="h-[8px] w-[8px] bg-[#FF4423] rounded-full absolute top-[-5px] left-[15px]"></div>
            )}
            <RiNotification3Fill
              className="cursor-pointer"
              onClick={handleNotificationClick}
            />
            <RiSettings2Fill className="cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
