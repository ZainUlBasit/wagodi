import React, { useEffect, useState } from "react";
import NavbarLogo from "../../assets/images/logoNavbar.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiNotification3Fill, RiSettings2Fill } from "react-icons/ri"; // Import eye icons from react-icons
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [activeNavItem, setActiveNavItem] = useState(""); // State to track the active navigation item
  const [showNotificationDot, setShowNotificationDot] = useState(true);
  // const NotifyNew = useSelector((state) => state.Notify.new);
  const NotifyNew = localStorage.getItem("noitfy") || false;
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
  }, [pathname]);

  return (
    <>
      <div className="w-full flex justify-center items-center max767:hidden">
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
                HOME
              </Link>
              {activeNavItem === "HOME" && (
                <div className="box-below-link active"></div>
              )}
            </div>
            <div className="relative overflow-hidden">
              <Link
                to={"/ongoing-orders"}
                className={`text-[18px] font-[700] maxWeb1:text-[25px] maxWeb2:text-[30px] maxWeb3:text-[35px] maxWeb4:text-[40px]`}
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
                className={`text-[18px] font-[700] maxWeb1:text-[25px] maxWeb2:text-[30px] maxWeb3:text-[35px] maxWeb4:text-[40px]`}
                onClick={() => handleNavItemClick("ORDER REPORTS")}
              >
                APPROVED REPORTS
              </Link>
              {activeNavItem === "ORDER REPORTS" && (
                <div className="box-below-link active"></div>
              )}
            </div>
            <div className="relative overflow-hidden w-fit">
              <Link
                to={"/users"}
                className={`text-[18px] font-[700] maxWeb1:text-[25px] maxWeb2:text-[30px] maxWeb3:text-[35px] maxWeb4:text-[40px]`}
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
                className={`text-[18px] font-[700] maxWeb1:text-[25px] maxWeb2:text-[30px] maxWeb3:text-[35px] maxWeb4:text-[40px]`}
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
                className={`text-[18px] font-[700] maxWeb1:text-[25px] maxWeb2:text-[30px] maxWeb3:text-[35px] maxWeb4:text-[40px]`}
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
                className={`text-[18px] font-[700] maxWeb1:text-[25px] maxWeb2:text-[30px] maxWeb3:text-[35px] maxWeb4:text-[40px]`}
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
            {NotifyNew && (
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
                activeNavItem === "Setting"
                  ? "border-[#475562]"
                  : "border-[#fff]"
              }`}
              onClick={() => {
                handleNavItemClick("Setting");
                navigate("/setting");
              }}
            >
              <RiSettings2Fill className="cursor-pointer maxWeb1:text-[2rem] maxWeb2:text-[2.3rem] maxWeb3:text-[2.9rem] maxWeb4:text-[2.6rem]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
