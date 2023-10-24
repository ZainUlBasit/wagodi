import React, { useEffect, useState } from "react";
import NavbarLogo from "../../assets/images/logoNavbar.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiNotification3Fill, RiSettings2Fill } from "react-icons/ri"; // Import eye icons from react-icons
import "./Navbar.css";

const Navbar = () => {
  const [activeNavItem, setActiveNavItem] = useState(""); // State to track the active navigation item
  const [showNotificationDot, setShowNotificationDot] = useState(true);
  const navigate = useNavigate();

  // Function to handle click on navigation items and set the active item
  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
  };

  const handleNotificationClick = () => {
    setShowNotificationDot(false);
  };

  const location = useLocation(); // Get the current location from react-router-dom
  const pathname = location.pathname;
  useEffect(() => {
    if ("/home" === pathname) handleNavItemClick("HOME");
    else if ("/ongoing-orders" === pathname)
      handleNavItemClick("ONGOING ORDERS");
    else if ("/orders-report" === pathname) handleNavItemClick("ORDER REPORTS");
    else if ("/users" === pathname) handleNavItemClick("USERS");
    else if ("/notification" === pathname) handleNavItemClick("Notification");
    else if ("/setting" === pathname) handleNavItemClick("Setting");
    else if ("/stations" === pathname) handleNavItemClick("STATION");
    else if ("/statistics" === pathname) handleNavItemClick("STATISTICS");
    else if ("/vendor" === pathname) handleNavItemClick("VENDOR");
  }, []);

  return (
    <>
      <div className="w-full flex justify-center items-center max767:hidden">
        <div className="w-[90%] max-w-[1300px] flex justify-between items-center">
          {/* Left side Logo */}
          <Link to={"/home"} onClick={() => handleNavItemClick("HOME")}>
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
                to={"/ongoing-orders"}
                className={`text-[18px] font-[700]`}
                onClick={() => handleNavItemClick("ONGOING ORDERS")}
              >
                ONGOING ORDERS
              </Link>
              <div
                className={
                  activeNavItem === "ONGOING ORDERS"
                    ? `box-below-link`
                    : "box-below-Inactive"
                }
              ></div>
            </div>
            <div className="relative overflow-hidden">
              <Link
                to={"/orders-report"}
                className={`text-[18px] font-[700]`}
                onClick={() => handleNavItemClick("ORDER REPORTS")}
              >
                ORDER REPORTS
              </Link>
              {activeNavItem === "ORDER REPORTS" && (
                <div className="box-below-link active"></div>
              )}
            </div>
            <div className="relative overflow-hidden w-fit">
              <Link
                to={"/users"}
                className={`text-[18px] font-[700]`}
                onClick={() => handleNavItemClick("USERS")}
              >
                USERS
              </Link>
              <div
                className={
                  activeNavItem === "USERS"
                    ? `box-below-link`
                    : "box-below-Inactive"
                }
              ></div>
            </div>
            <div className="relative overflow-hidden w-fit">
              <Link
                to={"/stations"}
                className={`text-[18px] font-[700]`}
                onClick={() => handleNavItemClick("STATION")}
              >
                STATION
              </Link>
              <div
                className={
                  activeNavItem === "STATION"
                    ? `box-below-link`
                    : "box-below-Inactive"
                }
              ></div>
            </div>
            <div className="relative overflow-hidden w-fit">
              <Link
                to={"/statistics"}
                className={`text-[18px] font-[700] ${
                  activeNavItem === "STATISTICS" ? "" : ""
                }`}
                onClick={() => handleNavItemClick("STATISTICS")}
              >
                STATISTICS
              </Link>
              <div
                className={
                  activeNavItem === "STATISTICS"
                    ? `box-below-link`
                    : "box-below-Inactive"
                }
              ></div>
            </div>
            <div className="relative overflow-hidden w-fit">
              <Link
                to={"/vendor"}
                className={`text-[18px] font-[700] ${
                  activeNavItem === "VENDOR" ? "" : ""
                }`}
                onClick={() => handleNavItemClick("VENDOR")}
              >
                VENDOR
              </Link>
              <div
                className={
                  activeNavItem === "VENDOR"
                    ? `box-below-link`
                    : "box-below-Inactive"
                }
              ></div>
            </div>
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
            <div
              className={`cursor-pointer py-[6px] px-[6px] border-2 rounded-full ${
                activeNavItem === "Setting"
                  ? "border-[#475562]"
                  : "border-[#fff]"
              }`}
              onClick={() => {
                handleNavItemClick("Setting");
                navigate("/setting");
              }}
            >
              <RiSettings2Fill className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
