import React, { useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { RiNotification3Fill, RiSettings2Fill } from "react-icons/ri"; // Import eye icons from react-icons
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { MobNavData, MobNavDataOrderManager } from "./MobNavData";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Typography } from "@mui/material";
import Logo from "../../assets/images/logoWhite.png";
import { useLocation, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import Logout from "../Modals/Logout";
import { useSelector } from "react-redux";
import LoggingOut from "../Modals/LoggingOut";
import { useTranslation } from "react-i18next";
import LanguageChangeBtn from "../buttons/LanguageChangeBtn";

const MobNavbar = () => {
  const [t, i18n] = useTranslation("global");
  const [showNotificationDot, setShowNotificationDot] = useState(true);
  const [ActiveNavItem, setActiveNavItem] = useState("");
  const [OpenLogoutModal, setOpenLogoutModal] = useState(false);
  const [OpenLoggingOut, setOpenLoggingOut] = useState(false);

  const handleNotificationClick = () => {
    setShowNotificationDot(false);
  };

  const [state, setState] = useState({
    left: false,
    menu: false,
  });

  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
  };

  const location = useLocation(); // Get the current location from react-router-dom
  const pathname = location.pathname;
  useEffect(() => {
    if ("/home" === pathname) handleNavItemClick("home");
    else if ("/ongoing-orders" === pathname)
      handleNavItemClick("ongoing_orders");
    else if ("/orders-report" === pathname)
      handleNavItemClick("approved_reports");
    else if ("/orders-report" === pathname)
      handleNavItemClick("approved_reports");
    else if ("/users" === pathname) handleNavItemClick("USERS");
    else if ("/notification" === pathname) handleNavItemClick("Notification");
    else if ("/setting" === pathname) handleNavItemClick("Setting");
    else if ("/stations" === pathname) handleNavItemClick("station");
    else if ("/statistics" === pathname) handleNavItemClick("statistics");
    else if ("/vendor" === pathname) handleNavItemClick("vendor");
    setState({
      left: false,
      menu: false,
    });
  }, [pathname]);

  const CurrentUser = useSelector((state) => state.auth);
  const list = (anchor) => (
    <Box
      sx={{
        width:
          anchor === "top" || anchor === "bottom"
            ? "auto"
            : CurrentUser.data.role === 0
            ? 280
            : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="bg-[#465462]"
    >
      <div className="w-full flex justify-center pt-5 m-0">
        <img src={Logo} alt="Images" className="w-[150px] max400:w-[100px]" />
      </div>
      <List
        sx={{
          display: "flex",
          justifyContent: "between",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>
          {CurrentUser.data.role === 1 ? (
            MobNavData.map((text, index) => (
              <>
                <ListItem
                  className="w-full flex justify-between py-1"
                  key={text.index}
                  disablePadding
                  onClick={() => {
                    navigate(text.link);
                    handleNavItemClick(text.title);
                  }}
                >
                  <ListItemButton className="w-full flex">
                    <Typography
                      //   variant="body1"
                      className="text-white w-full"
                      sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
                    >
                      {t(`adminnav.${text.title}`)}
                    </Typography>
                    <ListItemIcon className="flex justify-end">
                      <KeyboardArrowRightIcon className="text-white" />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <Typography
                  //   variant="div"
                  component="div"
                  className="text-white w-[90%] h-[2px] bg-[#FFFFFFB2]"
                  sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
                ></Typography>
              </>
            ))
          ) : CurrentUser.data.role === 0 ? (
            <>
              <>
                <ListItem
                  className="w-full flex justify-between py-1"
                  key={1}
                  disablePadding
                  onClick={() => {
                    navigate("/home");
                    handleNavItemClick("CompaniesInformation");
                  }}
                >
                  <ListItemButton className="w-full flex">
                    <Typography
                      //   variant="body1"
                      className="text-white w-full"
                      sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
                    >
                      {t("CompanyControls.CompaniesInformation")}
                    </Typography>
                    <ListItemIcon className="flex justify-end">
                      <KeyboardArrowRightIcon className="text-white" />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <Typography
                  //   variant="div"
                  component="div"
                  className="text-white w-[90%] h-[2px] bg-[#FFFFFFB2]"
                  sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
                ></Typography>
              </>
              <>
                <ListItem
                  className="w-full flex justify-between py-1"
                  key={1}
                  disablePadding
                  onClick={() => {
                    navigate("/subscription-requests");
                    handleNavItemClick("SubscriptionRequests");
                  }}
                >
                  <ListItemButton className="w-full flex">
                    <Typography
                      //   variant="body1"
                      className="text-white w-full"
                      sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
                    >
                      {t("CompanyControls.SubscriptionRequests")}
                    </Typography>
                    <ListItemIcon className="flex justify-end">
                      <KeyboardArrowRightIcon className="text-white" />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <Typography
                  //   variant="div"
                  component="div"
                  className="text-white w-[90%] h-[2px] bg-[#FFFFFFB2]"
                  sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
                ></Typography>
              </>
              <>
                <ListItem
                  className="w-full flex justify-between py-1"
                  key={1}
                  disablePadding
                  onClick={() => {
                    navigate("/control-subscribers");
                    handleNavItemClick("ControlSubscribers");
                  }}
                >
                  <ListItemButton className="w-full flex">
                    <Typography
                      //   variant="body1"
                      className="text-white w-full"
                      sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
                    >
                      {t("CompanyControls.ControlSubscribers")}
                    </Typography>
                    <ListItemIcon className="flex justify-end">
                      <KeyboardArrowRightIcon className="text-white" />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <Typography
                  //   variant="div"
                  component="div"
                  className="text-white w-[90%] h-[2px] bg-[#FFFFFFB2]"
                  sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
                ></Typography>
              </>
            </>
          ) : (
            MobNavDataOrderManager.map((text, index) => (
              <>
                <ListItem
                  className="w-full flex justify-between py-1"
                  key={text.index}
                  disablePadding
                  onClick={() => {
                    navigate(text.link);
                    handleNavItemClick(text.title);
                  }}
                >
                  <ListItemButton className="w-full flex">
                    <Typography
                      //   variant="body1"
                      className="text-white w-full"
                      sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
                    >
                      {t(`adminnav.${text.title}`)}
                    </Typography>
                    <ListItemIcon className="flex justify-end">
                      <KeyboardArrowRightIcon className="text-white" />
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                <Typography
                  //   variant="div"
                  component="div"
                  className="text-white w-[90%] h-[2px] bg-[#FFFFFFB2]"
                  sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
                ></Typography>
              </>
            ))
          )}
        </div>

        <div className="flex flex-col w-[90%]">
          <ListItem
            className="w-full flex justify-between py-1"
            key={"logout"}
            disablePadding
            onClick={() => {
              setOpenLogoutModal(!OpenLogoutModal);
            }}
          >
            <ListItemButton className="w-full flex bg-yellow-300">
              <Typography
                //   variant="body1"
                className="text-white w-full"
                sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
              >
                {t("Setting.Logout")}
              </Typography>
              <ListItemIcon className="flex justify-end">
                <TbLogout className="text-white text-[1.3rem]" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Typography
            //   variant="div"
            component="div"
            className="text-white w-[90%] h-[2px] bg-[#FFFFFFB2]"
            sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
          ></Typography>
        </div>
        <div className="flex flex-col w-[90%]">
          <ListItem
            className="w-full flex justify-between py-1"
            key={"logout"}
            disablePadding
            onClick={() => {
              setOpenLogoutModal(!OpenLogoutModal);
            }}
          >
            <ListItemButton className="w-full flex bg-yellow-300">
              <Typography
                //   variant="body1"
                className="text-white w-full"
                sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
              >
                <LanguageChangeBtn />
              </Typography>
            </ListItemButton>
          </ListItem>
          <Typography
            //   variant="div"
            component="div"
            className="text-white w-[90%] h-[2px] bg-[#FFFFFFB2]"
            sx={{ fontFamily: "Quicksand", fontWeight: "bold" }}
          ></Typography>
        </div>
      </List>
    </Box>
  );

  return (
    <div className="w-full justify-center items-center hidden max767:flex pt-4">
      <div className="flex justify-between items-center w-[90%] rounded-[30px] bg-[#465462] text-white px-5 py-3 font-[Quicksand]">
        <div className="text-[1.7rem]">
          <BiMenuAltLeft
            onClick={toggleDrawer("menu", true)}
            className="cursor-pointer"
          />
          <Drawer
            anchor={"left"}
            open={state["menu"]}
            onClose={toggleDrawer("menu", false)}
          >
            {list("left")}
          </Drawer>
        </div>
        <div className="font-bold text-[1.2rem]">
          {t(`adminnav.${ActiveNavItem}`)}
        </div>
        <div className="relative">
          {showNotificationDot && (
            <div className="h-[9px] w-[9px] bg-[#FF4423] rounded-full absolute top-[2px] left-[24px]"></div>
          )}
          <div
            className={`cursor-pointer py-[6px] px-[6px] border-2 rounded-full ${
              true ? "border-[#475562]" : "border-[#fff]"
            }`}
            onClick={() => {
              handleNotificationClick();
              navigate("/notification");
            }}
          >
            <RiNotification3Fill />
          </div>
        </div>
      </div>
      {OpenLogoutModal && (
        <Logout
          Open={OpenLogoutModal}
          setOpen={setOpenLogoutModal}
          setOpenLoggingOut={setOpenLoggingOut}
        />
      )}
      {OpenLoggingOut && (
        <div className="rounded-[20px] overflow-hidden">
          <LoggingOut Open={OpenLoggingOut} setOpen={setOpenLoggingOut} />
        </div>
      )}
    </div>
  );
};

export default MobNavbar;

{
  /* <div className="absolute right-5 top-5">
            <input
              type="checkbox"
              id="can-scan"
              name="can-scan"
              checked={CanScan}
              onChange={(e) => setCanScan(e.target.checked)}
            />
            <label htmlFor="can-scan" className="font-[Quicksand] font-bold">
              {" "}
              Can Scan
            </label>
          </div> */
}
