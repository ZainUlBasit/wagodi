import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import MobNavbar from "../Navbar/MobNavbar";
import OrderManagerNavbar from "../Navbar/OrderManagerNavbar";
import SuperAdminNavbar from "../Navbar/SuperAdminNavbar";

const NavSelection = () => {
  const auth = useSelector((state) => state.auth);
  const pathname = location.pathname;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Initial dimensions
    setWindowWidth(window.innerWidth);

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return pathname !== "/" &&
    pathname !== "/onboarding" &&
    pathname !== "/auth" &&
    pathname !== "/forgot-password" &&
    pathname !== "/otp-verification" &&
    pathname !== "/logout" &&
    pathname !== "/set-new-password" &&
    auth.data.role === 1 &&
    windowWidth > 767 ? (
    <Navbar />
  ) : pathname !== "/" &&
    pathname !== "/onboarding" &&
    pathname !== "/auth" &&
    pathname !== "/forgot-password" &&
    pathname !== "/otp-verification" &&
    pathname !== "/logout" &&
    pathname !== "/set-new-password" &&
    auth.data.role === 0 &&
    windowWidth > 767 ? (
    <SuperAdminNavbar />
  ) : pathname !== "/" &&
    pathname !== "/onboarding" &&
    pathname !== "/auth" &&
    pathname !== "/forgot-password" &&
    pathname !== "/logout" &&
    pathname !== "/otp-verification" &&
    pathname !== "/set-new-password" &&
    auth.data.role === 1 ? (
    <MobNavbar />
  ) : (
    pathname !== "/" &&
    pathname !== "/onboarding" &&
    pathname !== "/auth" &&
    pathname !== "/forgot-password" &&
    pathname !== "/otp-verification" &&
    pathname !== "/logout" &&
    pathname !== "/set-new-password" &&
    auth.data.role === 2 && <OrderManagerNavbar />
  );
};

export default NavSelection;
